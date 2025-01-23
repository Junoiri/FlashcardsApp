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
  const [showPopup, setShowPopup] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowPopup(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowPopup(false);
  };

  const cancelDelete = () => {
    setShowPopup(false);
  };

  return (
    <div className="flashcard-block" onClick={onClick}>
      <div className="flashcard-header"></div>
      <div className="flashcard-content">
        <h3 className="set-name">{setName}</h3>
        <p className="category">{category}</p>
        <p className="num-flashcards">{numFlashcards} Flashcards</p>
        <p className="author">Created by: {author}</p>
      </div>
      <div className="flashcard-actions">
        <button
          className="edit-button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <img src={editIcon} alt="Edit" />
        </button>
        <button className="delete-button" onClick={handleDeleteClick}>
          <img src={deleteIcon} alt="Delete" />
        </button>
      </div>

      {/* Custom Popup */}
      {showPopup && (
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
    </div>
  );
};

export default FlashcardBlock;
