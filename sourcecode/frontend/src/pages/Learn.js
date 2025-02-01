// PreviewPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PreviewPage.css";
import backIcon from "../assets/back1.png";
import { useNavigate, useParams } from "react-router-dom";

const PreviewPage = () => {
  const { flashcardSetId } = useParams();
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useState(null);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(""); // Add state for notification

  const flashcardSetTitle = localStorage.getItem("flashcardSetTitle");

  useEffect(() => {
    if (!flashcardSetId) {
      console.error("No flashcard set ID provided.");
      return;
    }

    const fetchFlashcardSet = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/flashcards/${flashcardSetId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFlashcards(response.data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
        if (error.response && error.response.status === 404) {
          setError("Flashcard set not found.");
        } else {
          setError("An error occurred while fetching the flashcards.");
        }
      }
    };

    fetchFlashcardSet();
  }, [flashcardSetId]);

  const handleBackClick = () => {
    navigate("/library");
  };

  const handleLearnClick = () => {
    // Check if there are flashcards
    if (
      flashcards &&
      flashcards.flashcards &&
      flashcards.flashcards.length > 0
    ) {
      // Pass the flashcards data as state when navigating to /learn
      navigate("/learn", { state: { flashcards } });
    } else {
      // Show notification if no flashcards are available
      setNotification("Nothing to learn yet");
    }
  };

  return (
    <div className="preview-container">
      <div className="preview-header">
        <button className="back-button" onClick={handleBackClick}>
          <img src={backIcon} alt="Back" className="back-icon" />
        </button>
        <h1 className="preview-title">Flashcard Set: {flashcardSetTitle}</h1>
        <button className="start-learning-button" onClick={handleLearnClick}>
          Start Learning
        </button>
      </div>
      {notification && <div className="notification">{notification}</div>}{" "}
      {/* Display the notification */}
      <div className="content-container">
        {error ? (
          <div className="error-message">{error}</div>
        ) : flashcards === null ? (
          <div>Loading...</div>
        ) : (
          <>
            {flashcards.flashcards && flashcards.flashcards.length === 0 ? (
              <div className="empty-set-message">
                This flashcard set is empty.
              </div>
            ) : (
              <div className="flashcard-grid">
                {flashcards.flashcards.map((flashcard, index) => (
                  <div key={index} className="flashcard">
                    <p className="flashcard-question">{flashcard.question}</p>
                    <hr />
                    <p className="flashcard-answer">{flashcard.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

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
