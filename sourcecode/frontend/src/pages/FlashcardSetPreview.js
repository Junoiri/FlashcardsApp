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
  const [showModal, setShowModal] = useState(false);
  const [flashcardSetTitle] = useState(
    localStorage.getItem("flashcardSetTitle")
  );

  useEffect(() => {
    if (!flashcardSetId) {
      console.error("No flashcard set ID provided.");
      return;
    }
    const fetchFlashcardSet = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        const response = await axios.get(
          `http://localhost:8000/flashcards/set/${flashcardSetId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API9 Response:", response.data);

        if (response.data && response.data.flashcards) {
          setFlashcards(response.data);
        } else {
          setError("No flashcards available in this set.");
        }
      } catch (error) {
        console.error("Error fetching flashcards:", error);
        if (error.response) {
          console.error("Error Response:", error.response);
          if (error.response.status === 404) {
            setError("Flashcard set not found.");
          } else {
            setError("An error occurred while fetching the flashcards.");
          }
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

  const handleCreateClick = (flashcardSetId, flashcardSetTitle) => {
    localStorage.setItem("flashcardSetId", flashcardSetId);
    localStorage.setItem("flashcardSetTitle", flashcardSetTitle);
    navigate(`/create`);
  };

  const handleLearnClick = () => {
    if (
      flashcards &&
      flashcards.flashcards &&
      flashcards.flashcards.length > 0
    ) {
      navigate("/learn", { state: { flashcards } });
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="preview-container">
      <div className="preview-header">
        <button className="back-button" onClick={handleBackClick}>
          <img src={backIcon} alt="Back" className="back-icon" />
        </button>
        <h1 className="preview-title">Flashcard Set: {flashcardSetTitle}</h1>
        <button
          className="start-learning-button"
          onClick={() => handleCreateClick(flashcardSetId, flashcardSetTitle)}
        >
          Create Flashcards
        </button>

        <button className="start-learning-button" onClick={handleLearnClick}>
          Start Learning
        </button>
      </div>

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
                {flashcards.flashcards &&
                Array.isArray(flashcards.flashcards) &&
                flashcards.flashcards.length > 0 ? (
                  flashcards.flashcards.map((flashcard, index) => (
                    <div key={index} className="flashcard">
                      <p className="flashcard-question">{flashcard.question}</p>
                      <hr />
                      <p className="flashcard-answer">{flashcard.answer}</p>
                    </div>
                  ))
                ) : (
                  <div className="empty-set-message">
                    This flashcard set is empty.
                  </div>
                )}
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

      {showModal && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="popup-close-icon" onClick={closeModal}>
              ✖
            </button>
            <h2>Nothing to Learn Yet</h2>
            <p>
              It looks like there are no flashcards in this set. Please add some
              flashcards to start learning!
            </p>
            <button className="popup-close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPage;
