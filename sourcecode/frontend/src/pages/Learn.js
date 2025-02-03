import React, { useState, useEffect } from "react";
import "../styles/Learn.css";
import backIcon from "../assets/back.png";
import sadIcon from "../assets/sad.png";
import midIcon from "../assets/happy.png";
import smileyIcon from "../assets/smiley.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Learn = () => {
  const { state } = useLocation();
  const flashcardSetId = state?.flashcardSetId;
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!flashcardSetId) {
      console.error("No flashcard set ID provided.");
      return;
    }

    const fetchFlashcardSet = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/flashcards/set/${flashcardSetId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFlashcards(response.data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
        setError("An error occurred while fetching the flashcards.");
      }
    };

    fetchFlashcardSet();
  }, [flashcardSetId]);

  const toggleShowAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  const handleNextFlashcard = () => {
    setShowAnswer(false);
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleBackClick = () => {
    navigate("/library");
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (flashcards.length === 0) {
    return <div>Loading...</div>;
  }

  const currentFlashcard = flashcards[currentIndex];

  return (
    <div className="learn-container">
      <div className="learn-header">
        <div className="back-button" onClick={handleBackClick}>
          <img src={backIcon} alt="Go Back" />
        </div>
        <h1 className="learn-title">Learn Flashcards</h1>
      </div>

      <div className="flashcard-container">
        <div className="flashcard">
          <div className="flashcard-content">
            {showAnswer ? currentFlashcard.definition : currentFlashcard.term}
          </div>
          <button className="show-answer-button" onClick={toggleShowAnswer}>
            {showAnswer ? "Back to question" : "Show answer"}
          </button>
        </div>
      </div>

      <div className="options-container">
        <button
          className="option-button option-bad"
          onClick={handleNextFlashcard}
        >
          <img src={sadIcon} alt="Bad" />
          Bad
        </button>
        <button
          className="option-button option-ok"
          onClick={handleNextFlashcard}
        >
          <img src={midIcon} alt="OK" />
          OK
        </button>
        <button
          className="option-button option-good"
          onClick={handleNextFlashcard}
        >
          <img src={smileyIcon} alt="Good" />
          Good
        </button>
      </div>
    </div>
  );
};

export default Learn;
