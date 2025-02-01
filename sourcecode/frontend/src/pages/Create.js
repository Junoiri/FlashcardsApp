import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Create.css";
import backIcon from "../assets/back.png";
import homeIcon from "../assets/home.png";
import libraryIcon from "../assets/music-library.png";
import settingsIcon from "../assets/settings.png";
import helpIcon from "../assets/help.png";
import robotIcon from "../assets/robot.png";
import flashCardIcon from "../assets/flash-card.png";
import rightArrowIcon from "../assets/right.png";
import uploadIcon from "../assets/upload.png";

const Create = () => {
  const navigate = useNavigate();
  const [showBackPopup, setShowBackPopup] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flashcardSetTitle] = useState(
    localStorage.getItem("flashcardSetTitle")
  );
  const [flashcardSetId] = useState(localStorage.getItem("flashcardSetId"));
  const handleBackButtonClick = () => setShowBackPopup(true);
  const confirmBackNavigation = () => navigate(-1);
  const cancelBackNavigation = () => setShowBackPopup(false);
  const handleAIOptionClick = () => setShowUploadPopup(true);
  const closeUploadPopup = () => setShowUploadPopup(false);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);
  };

  const removeFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleDone = async () => {
    if (uploadedFiles.length === 0) return;

    setLoading(true);
    setExtractedText("");
    setError(null);

    const formData = new FormData();
    formData.append("pdfFile", uploadedFiles[0]);

    try {
      const response = await axios.post(
        "http://localhost:8000/extract/extract-text",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setExtractedText(response.data.text);
    } catch (err) {
      setError("Failed to extract text. Please try again.");
    }

    setLoading(false);
  };

  const handleEditorClick = (flashcardSetId, flashcardSetTitle) => {
    localStorage.setItem("flashcardSetId", flashcardSetId);
    localStorage.setItem("flashcardSetTitle", flashcardSetTitle);

    navigate(`/editor`);
  };

  const navigateTo = (path) => navigate(path);

  return (
    <div className="create-container">
      <aside className="create-sidebar">
        <ul>
          <li onClick={() => navigateTo("/dashboard")}>
            <img src={homeIcon} alt="Home" />
            <a href="/dashboard">Home</a>
          </li>
          <li onClick={() => navigateTo("/library")}>
            <img src={libraryIcon} alt="Library" />
            <a href="/library">Library</a>
          </li>
          <li onClick={() => navigateTo("/settings")}>
            <img src={settingsIcon} alt="Settings" />
            <a href="/settings">Settings</a>
          </li>
          <li onClick={() => navigateTo("/help")}>
            <img src={helpIcon} alt="Help" />
            <a href="/help">Help</a>
          </li>
        </ul>
      </aside>

      <main className="create-main">
        <div className="back-button" onClick={handleBackButtonClick}>
          <img src={backIcon} alt="Go Back" />
        </div>

        <div className="content-placeholder">
          <div className="transparent-rectangle">
            <h1 className="create-title"> {flashcardSetTitle}</h1>
            <h2 className="create-subtitle">
              Get started by adding study material
            </h2>

            <div className="create-options">
              <div className="create-option" onClick={handleAIOptionClick}>
                <img
                  src={robotIcon}
                  alt="AI Flashcard"
                  className="option-icon"
                />
                <div className="create-option-content">
                  <h2>Generate flashcards with AI</h2>
                  <p>Select file and let AI generate custom flashcards.</p>
                </div>
                <img src={rightArrowIcon} alt="Arrow" className="right-arrow" />
              </div>

              <div
                className="create-option"
                onClick={() =>
                  handleEditorClick(flashcardSetId, flashcardSetTitle)
                }
              >
                <img
                  src={flashCardIcon}
                  alt="Manual Flashcard"
                  className="option-icon"
                />
                <div className="create-option-content">
                  <h2>Create flashcards manually</h2>
                  <p>
                    Add text, formulas, or images to craft each flashcard by
                    hand.
                  </p>
                </div>
                <img src={rightArrowIcon} alt="Arrow" className="right-arrow" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {showBackPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Are you sure?</h2>
            <p>Your progress will be lost if you leave this page.</p>
            <div className="popup-actions">
              <button onClick={confirmBackNavigation} className="popup-confirm">
                Yes, Go Back
              </button>
              <button onClick={cancelBackNavigation} className="popup-cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showUploadPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Generate flashcards with AI</h2>
            <p>Upload a PDF file to extract text.</p>
            <div className="file-upload-area">
              <label htmlFor="file-upload" className="upload-label">
                <img src={uploadIcon} alt="Upload Icon" />
                <span>Upload file</span>
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
              />
            </div>

            <ul className="file-preview-list">
              {uploadedFiles.map((file, index) => (
                <li key={index} className="file-preview-item">
                  <span>{file.name}</span>
                  <button onClick={() => removeFile(index)}>Remove</button>
                </li>
              ))}
            </ul>

            {loading && <p>Extracting text...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {extractedText && (
              <div className="extracted-text">
                <h3>Extracted Text</h3>
                <pre>{extractedText}</pre>
                <button
                  onClick={() => handleEditorClick()}
                  className="popup-confirm"
                >
                  Proceed to Flashcards
                </button>
              </div>
            )}

            <div className="popup-actions">
              <button onClick={closeUploadPopup} className="popup-cancel">
                Close
              </button>
              {uploadedFiles.length > 0 && (
                <button onClick={handleDone} className="popup-confirm">
                  Extract
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
