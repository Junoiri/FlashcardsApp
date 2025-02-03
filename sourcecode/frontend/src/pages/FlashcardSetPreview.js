import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PreviewPage.css";
import backIcon from "../assets/back1.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import { useNavigate, useParams } from "react-router-dom";

const PreviewPage = () => {
  const { flashcardSetId } = useParams();
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editFlashcard, setEditFlashcard] = useState(null);
  const [deleteFlashcardId, setDeleteFlashcardId] = useState(null);
  const [flashcardSetTitle] = useState(
    localStorage.getItem("flashcardSetTitle")
  );
  const [flashcardsLength, setFlashcardsLength] = useState();

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

        console.log("API Response:", response.data);
        setFlashcards(response.data);
        setFlashcardsLength(response.data.length);
        console.log(response.data.length);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
        setError("An error occurred while fetching the flashcards.");
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
    if (flashcards && flashcards.length > 0) {
      navigate("/learn", { state: { flashcardSetId } });
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEditClick = (flashcard) => {
    setEditFlashcard(flashcard);
  };

  const handleDeleteClick = (flashcardId) => {
    setDeleteFlashcardId(flashcardId);
  };

  const confirmDelete = async () => {
    if (!deleteFlashcardId) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8000/flashcards/${deleteFlashcardId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFlashcards(flashcards.filter((fc) => fc.id !== deleteFlashcardId));
      setDeleteFlashcardId(null);
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  const handleSaveEdit = async () => {
    if (!editFlashcard) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8000/flashcards/${editFlashcard.id}`,
        {
          term: editFlashcard.term,
          definition: editFlashcard.definition,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFlashcards(
        flashcards.map((fc) =>
          fc.id === editFlashcard.id ? editFlashcard : fc
        )
      );
      setEditFlashcard(null);
    } catch (error) {
      console.error("Error updating flashcard:", error);
    }
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
            {flashcards.flashcards && flashcardsLength === 0 ? (
              <div className="empty-set-message">
                This flashcard set is empty.
              </div>
            ) : (
              <div className="flashcard-grid">
                {flashcards.length > 0 ? (
                  flashcards.map((flashcard, index) => (
                    <div key={index} className="flashcard">
                      <p className="flashcard-question">{flashcard.term}</p>
                      <p className="flashcard-answer">{flashcard.definition}</p>
                      <div className="flashcard-actions">
                        <button
                          className="edit-button"
                          onClick={() => handleEditClick(flashcard)}
                        >
                          <img src={editIcon} alt="Edit" />
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteClick(flashcard.id)}
                        >
                          <img src={deleteIcon} alt="Delete" />
                        </button>
                      </div>
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
        <div className="popup-overlay" onClick={(e) => e.stopPropagation()}>
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

      {editFlashcard && (
        <div className="popup-overlay" onClick={(e) => e.stopPropagation()}>
          <div className="popup-content">
            <h2>Edit Flashcard</h2>
            <label>Question</label>
            <input
              type="text"
              value={editFlashcard.term}
              onChange={(e) =>
                setEditFlashcard({ ...editFlashcard, term: e.target.value })
              }
            />
            <label>Answer</label>
            <input
              type="text"
              value={editFlashcard.definition}
              onChange={(e) =>
                setEditFlashcard({
                  ...editFlashcard,
                  definition: e.target.value,
                })
              }
            />
            <div className="popup-actions">
              <button
                onClick={() => setEditFlashcard(null)}
                className="popup-cancel"
              >
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="popup-confirm">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteFlashcardId && (
        <div className="popup-overlay" onClick={(e) => e.stopPropagation()}>
          <div className="popup-content">
            <p>Are you sure you want to delete this flashcard?</p>
            <div className="popup-actions">
              <button onClick={confirmDelete} className="popup-confirm">
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteFlashcardId(null)}
                className="popup-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPage;
