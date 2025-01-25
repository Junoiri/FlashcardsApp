import React, { useState } from "react";
import "../styles/Learn.css";
import backIcon from "../assets/back.png";
import sadIcon from "../assets/sad.png";
import midIcon from "../assets/happy.png";
import smileyIcon from "../assets/smiley.png";

const Learn = () => {
  const [showAnswer, setShowAnswer] = useState(false);

  const flashcard = {
    question: "What is the capital of France?",
    answer: "The capital of France is Paris.",
  };

  const toggleShowAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  return (
    <div className="learn-container">
      <div className="learn-header">
        <div className="back-button" onClick={() => window.history.back()}>
          <img src={backIcon} alt="Go Back" />
        </div>
        <h1 className="learn-title">Revision: Geography</h1>
      </div>

      <div className="progress-bar">
        <div className="progress-step"></div>
        <div className="progress-step"></div>
        <div className="progress-step"></div>
        <div className="progress-step"></div>
        <div className="progress-step"></div>
      </div>

      <div className="flashcard-container">
        <div className="flashcard">
          <div className="flashcard-content">
            {showAnswer ? flashcard.answer : flashcard.question}
          </div>
          <button className="show-answer-button" onClick={toggleShowAnswer}>
            {showAnswer ? "Back to question" : "Show answer"}
          </button>
        </div>
      </div>

      <div className="options-container">
        <button className="option-button option-bad">
          <img src={sadIcon} alt="Bad" />
          Bad
        </button>
        <button className="option-button option-ok">
          <img src={midIcon} alt="OK" />
          OK
        </button>
        <button className="option-button option-good">
          <img src={smileyIcon} alt="Good" />
          Good
        </button>
      </div>
    </div>
  );
};

export default Learn;
