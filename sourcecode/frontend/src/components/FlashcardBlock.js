import React, { useState } from "react";
import "../styles/FlashcardBlock.css";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";

/**
 * FlashcardBlock component renders a flashcard block with functionalities to view, edit, and delete flashcards.
 * It displays the flashcard set's name, category, number of flashcards, and author.
 * It also provides buttons to edit and delete the flashcard set, with corresponding popups for confirmation and input.
 *
 * @param {string} setName - The name of the flashcard set.
 * @param {string} category - The category of the flashcard set.
 * @param {number} numFlashcards - The number of flashcards in the set.
 * @param {string} author - The author of the flashcard set.
 * @param {function} onClick - The function to call when the flashcard block is clicked.
 * @param {function} onEdit - The function to call when the flashcard set is edited.
 * @param {function} onDelete - The function to call when the flashcard set is deleted.
 * @returns {JSX.Element} The rendered flashcard block component.
 */
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

  /**
   * Handles the click event for the delete button.
   * Stops event propagation and shows the delete confirmation popup.
   *
   * @param {Event} e - The click event.
   */
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeletePopup(true);
  };

  /**
   * Confirms the deletion of the flashcard set.
   * Calls the onDelete function and hides the delete confirmation popup.
   */
  const confirmDelete = () => {
    onDelete();
    setShowDeletePopup(false);
  };

  /**
   * Cancels the deletion of the flashcard set.
   * Hides the delete confirmation popup.
   */
  const cancelDelete = () => {
    setShowDeletePopup(false);
  };

  /**
   * Handles the click event for the edit button.
   * Stops event propagation and shows the edit popup.
   *
   * @param {Event} e - The click event.
   */
  const handleEditClick = (e) => {
    e.stopPropagation();
    setShowEditPopup(true);
  };

  /**
   * Handles the save action for the edited flashcard.
   * Logs the question and answer, calls the onEdit function, and hides the edit popup.
   */
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
