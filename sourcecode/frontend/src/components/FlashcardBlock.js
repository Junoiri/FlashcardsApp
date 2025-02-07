import React from "react";
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
        <button
          className="edit-button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <img src={editIcon} alt="Edit" />
        </button>
        <button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <img src={deleteIcon} alt="Delete" />
        </button>
      </div>
    </div>
  );
};

export default FlashcardBlock;
