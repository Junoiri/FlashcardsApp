import React, { useState } from "react";
import "../styles/FlashcardBlock.css";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";

const FlashcardBlock = ({
  setName,
  category,
  numFlashcards,
  author,
  onClick,
  onEdit,
  onDelete,
}) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowDeletePopup(false);
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setShowEditPopup(true);
  };

  const handleSave = () => {
    console.log("Saving:", { question, answer });
    if (onEdit) {
      onEdit({ question, answer });
    }
    setShowEditPopup(false);
  };

  return (
    <div className="flashcard-block" onClick={onClick}>
      <div className="flashcard-header"></div>
      <div className="flashcard-content">
        <h3 className="set-name">{setName}</h3>
        <p className="category">{category}</p>
        <p className="num-flashcards">{numFlashcards ?? 0} Flashcards</p>
        <p className="author">Created by: {author || "Unknown"}</p>
      </div>
      <div className="flashcard-actions">
        <button className="edit-button" onClick={handleEditClick}>
          <img src={editIcon} alt="Edit" />
        </button>
        <button className="delete-button" onClick={handleDeleteClick}>
          <img src={deleteIcon} alt="Delete" />
        </button>
      </div>

      {showDeletePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>Are you sure you want to delete "{setName}"?</p>
            <div className="popup-actions">
              <button onClick={confirmDelete} className="popup-confirm">
                Yes, Delete
              </button>
              <button onClick={cancelDelete} className="popup-cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Edit Flashcard</h3>
            <div className="popup-input">
              <label>Question</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter question"
              />
            </div>
            <div className="popup-input">
              <label>Answer</label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter answer"
              />
            </div>
            <div className="popup-actions">
              <button
                onClick={() => setShowEditPopup(false)}
                className="popup-cancel"
              >
                Cancel
              </button>
              <button onClick={handleSave} className="popup-confirm">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardBlock;
