import React, { useEffect, useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import ChatBot from "./components/ChatBot";

export default function App() {
  const { signIn, signOut, isAuthenticated } = useAuthContext();
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  useEffect(() => {
    async function signInCheck() {
      setIsAuthLoading(true);
      await sleep(2000);
      const isSignedIn = await isAuthenticated();
      setSignedIn(isSignedIn);
      setIsAuthLoading(false);
    }
    signInCheck();
  }, []);

  const handleSignIn = async () => {
    setIsAuthLoading(true);
    signIn()
      .then(() => {
        setSignedIn(true);
        setIsAuthLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (isAuthLoading) {
    return <div className="animate-spin h-5 w-5 text-white">.</div>;
  }

  if (!signedIn) {
    return (
      <div className="content">
        <h1 className="header-title">Choreo Q&A Bot</h1>
        <h4 className="header-description">
          Sample demo of a Q&A chatbot for&nbsp;
          <a
            href="https://wso2.com/choreo/docs/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Choreo documentation
          </a>
          .
        </h4>
        <button
          className="btn primary"
          onClick={() => {
            handleSignIn();
          }}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="content">
      <ChatBot />
      <button
        className="btn primary mt-4"
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
    </div>
  );
}
