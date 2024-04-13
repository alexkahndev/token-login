import { Elysia, t } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { renderToReadableStream } from "react-dom/server.browser";
import { swagger } from "@elysiajs/swagger";
import React, { createElement } from "react";
import { readdir } from "node:fs/promises";
import { extname, join } from "node:path";
import Home from "./pages/Home";
import { createUser, loginUser } from "./handlers/UserHandler";

const host = Bun.env.HOST || "localhost";
const port = Bun.env.PORT || 3000;

// Define the directory with your entrypoints
const entryDir = "./src/indexes";

// Use readdir to get an array of filenames in the entry directory
const files = await readdir(entryDir);

// Filter the array to only include .tsx files
const entrypoints = files.filter((file) => extname(file) === ".tsx");

// Prepend the directory path to each entrypoint
const entryPaths = entrypoints.map((file) => join(entryDir, file));

await Bun.build({
  entrypoints: entryPaths,
  outdir: "./build",
  minify: true,
});

const doYouLikeSwaggerUIBetter = false;

async function handleRequest(
  pageComponent: React.ComponentType,
  index: string,
) {
  const page = createElement(pageComponent);
  const stream = await renderToReadableStream(page, {
    bootstrapScripts: [index],
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/html" },
  });
}

export const server = new Elysia()

  .use(
    staticPlugin({
      assets: "./build",
      prefix: "",
    }),
  )
  .use(
    swagger({
      provider: doYouLikeSwaggerUIBetter ? "swagger-ui" : "scalar",
    }),
  )
  .get("/", () => handleRequest(Home, "/HomeIndex.js"))
  .get("/auth0-callback", () => new Response("Auth0 Callback"))
  .post("/signup", ({ body }) => createUser(body), {
    body: t.Object({
      firstName: t.String(),
      lastName: t.String(),
      email: t.String(),
      password: t.String(),
    }),
  })
  .post("/login", ({ body }) => loginUser(body), {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  })

  .listen(port, () => {
    console.log(`server started on http://${host}:${port}`);
  })
  .on("error", (error) => {
    console.error(`Server error: ${error.code}`);
  });
