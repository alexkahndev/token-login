import { useState } from "react";

type SignupProps = {
  setUid: (uid: string) => void;
};

export const Login = ({ setUid }: SignupProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email === "" || password === "") {
      alert("All fields must be filled!");
      return;
    }

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      console.error("Error logging in:", response.statusText);
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
      <p>Login to see Token</p>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
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
          margin: "10px",
        }}
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};
