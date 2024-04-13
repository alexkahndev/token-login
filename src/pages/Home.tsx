import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";
import { NotAuthorized } from "../components/NotAuthorized";
import { Authorized } from "../components/Authorized";

const Home = () => {
  const [uid, setUid] = useState<string>("");

  const [faceBookProps, faceBookSpringApi] = useSpring(() => ({
    opacity: 0.3,
    background: "#4267B2",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    marginRight: "10px",
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
  }));

  const [twitterProps, twitterSpringApi] = useSpring(() => ({
    opacity: 0.3,
    background: "#1DA1F2",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    marginRight: "10px",
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
  }));

  const [googleProps, googleSpringApi] = useSpring(() => ({
    opacity: 0.3,
    background: "#0F9D58",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    marginRight: "10px",
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
  }));

  const handleFaceBookHover = () => {
    faceBookSpringApi.start({
      boxShadow: "0px 0px 20px rgba(66,103,178,1)",
    });
  };

  const handleFaceBookUnhover = () => {
    faceBookSpringApi.start({
      boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    });
  };

  const handleTwitterHover = () => {
    twitterSpringApi.start({
      boxShadow: "0px 0px 20px rgba(29,161,242,1)",
    });
  };

  const handleTwitterUnhover = () => {
    twitterSpringApi.start({
      boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    });
  };

  const handleGoogleHover = () => {
    googleSpringApi.start({
      boxShadow: "0px 0px 20px rgba(15,157,88,1)",
    });
  };

  const handleGoogleUnhover = () => {
    googleSpringApi.start({
      boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    });
  };

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Token Login</title>
        <meta name="description" content="Bun, Elysia & React" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/styles/Home.css" />
        <link rel="icon" href="/assets/favicon.ico" />
      </head>
      <body
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Awesome.Social Token Login Test
          </h1>
          <div>
            {uid ? (
              <Authorized uid={uid} setUid={setUid} />
            ) : (
              <NotAuthorized setUid={setUid} />
            )}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "20px",
            }}
          >
            <animated.button
              style={faceBookProps}
              onMouseEnter={handleFaceBookHover}
              onMouseLeave={handleFaceBookUnhover}
            >
              FaceBook
            </animated.button>
            <animated.button
              style={twitterProps}
              onMouseEnter={handleTwitterHover}
              onMouseLeave={handleTwitterUnhover}
            >
              Twitter
            </animated.button>
            <animated.button
              style={googleProps}
              onMouseEnter={handleGoogleHover}
              onMouseLeave={handleGoogleUnhover}
            >
              Google
            </animated.button>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Home;
