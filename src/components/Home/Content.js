import React from "react";
import { useState, useEffect } from "react";
import "./Content.css";

function Content() {
  const HIGHER_COLOR_CONFIG = [
    "rgb(96, 165, 250)",
    "rgb(255, 45, 85)",
    "rgb(255, 204, 0)",
    "rgb(52, 199, 89)",
  ];

  const [higherColorIdx, setHigherColorIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHigherColorIdx((higherColorIdx + 1) % HIGHER_COLOR_CONFIG.length);
    }, 1500);
    return () => clearInterval(interval);
  });

  return (
    <div className="flex flex-col items-start">
      <div className="pt-[4rem] text-4xl sm:text-5xl sm:leading-[56px] md:text-7xl font-semibold duration-300">
        Score{" "}
        <span
          className="appear color-transition"
          style={{ color: HIGHER_COLOR_CONFIG[higherColorIdx] }}
        >
          higher
        </span>{" "}
        with AI tutor
        <div className="text-red-500 inline-block rotate-12 ml-1">.</div>
      </div>
      <h1 className="text-gray-500 text-lg mt-4">
        {`Instantly summarize and chat
        with videos, create notes and flashcards from any document, ask
        your AI tutor anything.`}
      </h1>
    </div>
  );
}

export default Content;
