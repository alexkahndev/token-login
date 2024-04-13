import React, { useState } from "react";
import { Signup } from "./Signup";
import { Login } from "./Login";

type NotAuthorizedProps = {
  setUid: (uid: string) => void;
};

export const NotAuthorized = ({ setUid }: NotAuthorizedProps) => {
  const [signupActive, setSignupActive] = useState<boolean>(true);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {signupActive ? <Signup setUid={setUid} /> : <Login setUid={setUid} />}
      <button
        style={{
          background: "none",
          border: "none",
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
          marginTop: "10px",
        }}
        onClick={() => setSignupActive(!signupActive)}
      >
        {signupActive ? "Already have an account?" : "Don't have an account?"}
      </button>
    </div>
  );
};
