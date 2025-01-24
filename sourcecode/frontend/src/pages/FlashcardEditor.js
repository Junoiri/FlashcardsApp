import React, { useState } from "react";
import "../styles/FlashcardEditor.css";
import backIcon from "../assets/back.png";
import imageIcon from "../assets/imageIcon.png";

const FlashcardEditor = () => {
  const [boldActive, setBoldActive] = useState(false);
  const [italicActive, setItalicActive] = useState(false);
  const [underlineActive, setUnderlineActive] = useState(false);
  const [uppercaseActive, setUppercaseActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [flashcards, setFlashcards] = useState([{ question: "", answer: "" }]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

  // Toolbar button handlers
  const toggleBold = () => setBoldActive((prev) => !prev);
  const toggleItalic = () => setItalicActive((prev) => !prev);
  const toggleUnderline = () => setUnderlineActive((prev) => !prev);
  const toggleUppercase = () => setUppercaseActive((prev) => !prev);

  const applyTextStyles = () => {
    let styles = {};
    if (boldActive) styles.fontWeight = "bold";
    if (italicActive) styles.fontStyle = "italic";
    if (underlineActive) styles.textDecoration = "underline";
    if (uppercaseActive) styles.textTransform = "uppercase";
    return styles;
  };

  // Image upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
  };

  // Adding a new flashcard
  const addNewFlashcard = () => {
    setFlashcards((prev) => [...prev, { question: "", answer: "" }]);
    setCurrentFlashcardIndex(flashcards.length);
  };

  // Save button functionality
  const handleSave = () => {
    console.log("Flashcards saved:", flashcards);
  };

  // Question and Answer handlers
  const handleQuestionChange = (e) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[currentFlashcardIndex].question = e.target.value;
    setFlashcards(updatedFlashcards);
  };

  const handleAnswerChange = (e) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[currentFlashcardIndex].answer = e.target.value;
    setFlashcards(updatedFlashcards);
  };

  return (
    <div className="editor-container">
      {/* Header */}
      <div className="editor-header">
        <div className="back-button" onClick={() => window.history.back()}>
          <img src={backIcon} alt="Go Back" />
        </div>
        <h1 className="editor-title">Test set</h1>
      </div>

      {/* Flashcard Preview Menu */}
      <div className="flashcard-list-container">
        <button className="new-flashcard-button" onClick={addNewFlashcard}>
          + New flashcard
        </button>
        <div className="flashcard-list">
          {flashcards.map((flashcard, index) => (
            <div
              key={index}
              className={`flashcard-preview ${
                index === currentFlashcardIndex ? "active" : ""
              }`}
              onClick={() => setCurrentFlashcardIndex(index)}
            >
              {flashcard.question || `Flashcard ${index + 1}`}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="editor-main">
        {/* Flashcard Editor */}
        <div className="flashcard-editor">
          <div className="editor-toolbar">
            <button
              className={`toolbar-button ${boldActive ? "active" : ""}`}
              onClick={toggleBold}
            >
              <b>B</b>
            </button>
            <button
              className={`toolbar-button ${italicActive ? "active" : ""}`}
              onClick={toggleItalic}
            >
              <i>I</i>
            </button>
            <button
              className={`toolbar-button ${underlineActive ? "active" : ""}`}
              onClick={toggleUnderline}
            >
              <u>U</u>
            </button>
            <button
              className={`toolbar-button ${uppercaseActive ? "active" : ""}`}
              onClick={toggleUppercase}
            >
              Aa
            </button>
            <label htmlFor="image-upload" className="toolbar-button">
              <img src={imageIcon} alt="Upload" className="image-upload-icon" />
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </div>

          {/* Image Preview */}
          {uploadedImage && (
            <div className="image-preview-container">
              <img
                src={URL.createObjectURL(uploadedImage)}
                alt="Uploaded"
                className="uploaded-image"
              />
              <button className="remove-image-button" onClick={removeImage}>
                Remove
              </button>
            </div>
          )}

          {/* Text Fields */}
          <textarea
            className="editor-textarea"
            placeholder="Write your question here..."
            style={applyTextStyles()}
            value={flashcards[currentFlashcardIndex]?.question || ""}
            onChange={handleQuestionChange}
          ></textarea>
          {flashcards[currentFlashcardIndex]?.answer === "" ? (
            <button
              className="add-answer-button"
              onClick={() =>
                handleAnswerChange({ target: { value: "Answer" } })
              }
            >
              + Add answer
            </button>
          ) : (
            <textarea
              className="editor-textarea"
              placeholder="Write your answer here..."
              style={applyTextStyles()}
              value={flashcards[currentFlashcardIndex]?.answer || ""}
              onChange={handleAnswerChange}
            ></textarea>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="save-button-container">
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default FlashcardEditor;
