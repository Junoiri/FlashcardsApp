import React, { useState } from "react";
import "../styles/PreviewPage.css";
import backIcon from "../assets/back1.png"; // Importing the back icon

const PreviewPage = () => {
  const [flashcards, setFlashcards] = useState([
    { question: "What is the capital of France?", answer: "Paris" },
    {
      question: "Who developed the theory of relativity?",
      answer: "Albert Einstein",
    },
    { question: "What is the powerhouse of the cell?", answer: "Mitochondria" },
  ]);

  const [showMore, setShowMore] = useState(true);

  const loadMoreFlashcards = () => {
    const moreFlashcards = [
      { question: "What is 2 + 2?", answer: "4" },
      { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
    ];
    setFlashcards([...flashcards, ...moreFlashcards]);
    setShowMore(false);
  };

  return (
    <div className="preview-container">
      {/* Header */}
      <div className="preview-header">
        <button className="back-button">
          <img src={backIcon} alt="Back" className="back-icon" />
        </button>
        <h1 className="preview-title">Flashcard Set: Public Health</h1>
        <button className="start-learning-button">Start Learning</button>
      </div>

      {/* Flashcards Grid & Progress Container */}
      <div className="content-container">
        <div className="flashcard-grid">
          {flashcards.map((flashcard, index) => (
            <div key={index} className="flashcard">
              <p className="flashcard-question">{flashcard.question}</p>
              <hr />
              <p className="flashcard-answer">{flashcard.answer}</p>
            </div>
          ))}

          {/* Show More Button */}
          {showMore && (
            <div className="show-more-container">
              <button className="show-more-button" onClick={loadMoreFlashcards}>
                Show More Flashcards
              </button>
            </div>
          )}
        </div>

        {/* Progress Section */}
        <div className="progress-container">
          <h2 className="progress-title">Your Progress</h2>
          <div className="progress-circle">
            <p>0%</p>
          </div>
          <div className="progress-info">
            <span>🟢 Learned: 0%</span>
            <span>🟡 To be reviewed: 0%</span>
            <span>⚫ Not learned: 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
