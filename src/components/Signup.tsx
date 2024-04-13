import { useState } from "react";

type SignupProps = {
  setUid: (uid: string) => void;
};

export const Signup = ({ setUid }: SignupProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignup = async () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      alert("All fields must be filled!");
      return;
    }

    if (!validateEmail(email)) {
      alert("Invalid email format!");
      return;
    }

    const response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      console.error("Error signing up:", response.statusText);
    }

    const data = await response.json();
    setUid(data.user_id);
  };

  const inputBoxStyle = {
    padding: "10px",
    margin: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    background: "linear-gradient(to right, #00b4db, #0083b0)",
    color: "white",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    outline: "none",
    transition: "all 0.3s ease",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p>Signup to see Token</p>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          aria-autocomplete="list"
          style={inputBoxStyle}
        />
        <input
          type="text"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          aria-autocomplete="list"
          style={inputBoxStyle}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-email"
          aria-autocomplete="list"
          style={inputBoxStyle}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          aria-autocomplete="list"
          style={inputBoxStyle}
        />
      </form>
      <button
        style={{
          background: "blue",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          marginRight: "10px",
        }}
        onClick={handleSignup}
      >
        Signup
      </button>
    </div>
  );
};
