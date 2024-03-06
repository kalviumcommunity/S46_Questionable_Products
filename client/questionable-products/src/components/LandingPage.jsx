"use client";
import React, { useState } from "react";
import "./LandingPage.css";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
function LandingPage() {
  const words = [
    {
      text: "Explore",
    },
    {
      text: "Questionable",
      className: "dark:text-purple-600",
    },
    {
      text: "Products.",
      className: "dark:text-purple-600",
    },
  ];

  return (
    <>
      <div className="wrapper">
        <h2>Explore mind-boggling products</h2>
        <div>
          <h1 className="top">
            <TypewriterEffectSmooth words={words} />
          </h1>
        </div>

        <div className="buttons">
          <button className="btnone button singup">
            <Link to="/signup">Sign Up</Link>
          </button>
          <button className="btnone button log">
            <Link to="/login">Login</Link>
          </button>
        </div>
      </div>
      <p className="copyright">
        All rights reserved. This project was created by
        MELVIN.
      </p>
    </>
  );
}

export default LandingPage;
