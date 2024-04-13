import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../../db/schema";
import { user } from "../../db/schema";

if (!Bun.env.DATABASE_URL) {
  throw new Error("Neon Environment Variables are not defined");
}

const sql = neon(Bun.env.DATABASE_URL);
const db = drizzle(sql, { schema });

if (!Bun.env.AUTH0_DOMAIN || !Bun.env.AUTH0_CLIENT_ID) {
  throw new Error("Auth0 Environment Variables are not defined");
}

export async function getBearerToken() {
  if (
    !Bun.env.AUTH0_BEARER_TOKEN_URL ||
    !Bun.env.AUTH0_CLIENT_ID ||
    !Bun.env.AUTH0_CLIENT_SECRET ||
    !Bun.env.AUTH0_AUDIENCE ||
    !Bun.env.AUTH0_USERS_URL
  ) {
    return new Response("Missing Auth0 Environment Variables", { status: 500 });
  }

  try {
    const response = await fetch(Bun.env.AUTH0_BEARER_TOKEN_URL, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: new URLSearchParams({
        client_id: Bun.env.AUTH0_CLIENT_ID,
        client_secret: Bun.env.AUTH0_CLIENT_SECRET,
        audience: Bun.env.AUTH0_AUDIENCE,
        grant_type: "client_credentials",
      }),
    });
    const responseData = await response.json();
    return responseData.access_token;
  } catch (error) {
    console.error("Error Getting Bearer Token: ", error);
    throw error;
  }
}

export async function createUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const bearer_token = await getBearerToken();

  if (!Bun.env.AUTH0_USERS_URL) {
    return new Response("Missing Auth0 Environment Variables", { status: 500 });
  }

  try {
    const response = await fetch(Bun.env.AUTH0_USERS_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${bearer_token}`,
      },
      body: JSON.stringify({
        given_name: data.firstName,
        family_name: data.lastName,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
        connection: "Username-Password-Authentication",
      }),
    });
    const responseData = await response.json();

    try {
      await db.insert(user).values({ sub: responseData.user_id });
      return responseData;
    } catch (error) {
      console.error("Error Adding User to Database:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error Creating User:", error);
    throw error;
  }
}

export async function loginUser(body: { email: string; password: string }) {
  if (
    !Bun.env.AUTH0_DOMAIN ||
    !Bun.env.AUTH0_CLIENT_ID ||
    !Bun.env.AUTH0_CLIENT_SECRET
  ) {
    return new Response("Missing Auth0 Environment Variables", { status: 500 });
  }

  try {
    const bearer_token = await getBearerToken();

    const response = await fetch(
      `https://${Bun.env.AUTH0_DOMAIN}/api/v2/users?q=email:"${encodeURIComponent(body.email)}" AND identities.connection:"Username-Password-Authentication"&search_engine=v3`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${bearer_token}`,
        },
      },
    );
    const responseData = await response.json();

    if (responseData.length === 0) {
      console.error("Error Logging In: User not found");
      return new Response("Error Logging In: User not found", { status: 404 });
    }

    const user = responseData[0];
    // if (user.email_verified) {
    //   console.log("Auth Result:", user);
    //   return new Response("Login Successful");
    // } else {
    //   console.error("Error Logging In: Email not verified");
    //   return new Response("Error Logging In: Email not verified", { status: 401 });
    // }
    if (user) {
      console.log("Auth Result:", user);
      return user;
    }
  } catch (error) {
    console.error("Error Logging In:", error);
    return new Response("Error Logging In", { status: 500 });
  }
}
