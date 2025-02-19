import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Create.css";
import backIcon from "../assets/back.png";
import homeIcon from "../assets/home.png";
import libraryIcon from "../assets/music-library.png";
import settingsIcon from "../assets/settings.png";
import robotIcon from "../assets/robot.png";
import flashCardIcon from "../assets/flash-card.png";
import rightArrowIcon from "../assets/right.png";
import uploadIcon from "../assets/upload.png";

/**
 * Create component allows users to create flashcards either manually or by uploading a PDF file.
 * It provides options to navigate to different sections of the application and handles file uploads for AI-generated flashcards.
 *
 * @returns {JSX.Element} The rendered Create component.
 */
const Create = () => {
  const navigate = useNavigate();
  const [showBackPopup, setShowBackPopup] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  // eslint-disable-next-line
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const flashcardSetTitle = localStorage.getItem("flashcardSetTitle");
  const flashcardSetId = localStorage.getItem("flashcardSetId");

  /**
   * Shows the back navigation confirmation popup.
   */
  const handleBackButtonClick = () => setShowBackPopup(true);

  /**
   * Confirms the back navigation and navigates to the previous page.
   */
  const confirmBackNavigation = () => navigate(-1);

  /**
   * Cancels the back navigation and hides the confirmation popup.
   */
  const cancelBackNavigation = () => setShowBackPopup(false);

  /**
   * Shows the upload popup for AI-generated flashcards.
   */
  const handleAIOptionClick = () => setShowUploadPopup(true);

  /**
   * Closes the upload popup.
   */
  const closeUploadPopup = () => setShowUploadPopup(false);

  /**
   * Handles file upload and updates the uploaded files state.
   *
   * @param {Event} e - The file input change event.
   */
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);
  };

  /**
   * Removes a file from the uploaded files list.
   *
   * @param {number} index - The index of the file to remove.
   */
  const removeFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  /**
   * Uploads a PDF file to the server and generates flashcards using AI.
   *
   * @param {File} file - The PDF file to upload.
   */
  const handleUploadPDF = async (file) => {
    if (!flashcardSetId) {
      setError("Flashcard Set ID is missing. Please try again.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("setId", flashcardSetId);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/flashcards/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setFlashcards(response.data.flashcards);
      closeUploadPopup();
      navigate("/editor");
    } catch (error) {
      console.error("Error uploading PDF:", error.response?.data || error);
      setError("Failed to generate flashcards. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the done action for the upload popup.
   * Uploads the first file in the uploaded files list.
   */
  const handleDone = () => {
    if (uploadedFiles.length === 0) return;
    handleUploadPDF(uploadedFiles[0]);
  };

  /**
   * Navigates to the flashcard editor page.
   */
  const handleEditorClick = () => {
    navigate("/editor");
  };

  /**
   * Navigates to the specified path.
   *
   * @param {string} path - The path to navigate to.
   */
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
        </ul>
      </aside>

      <main className="create-main">
        <div className="back-button" onClick={handleBackButtonClick}>
          <img src={backIcon} alt="Go Back" />
        </div>

        <div className="content-placeholder">
          <div className="transparent-rectangle">
            <h1 className="create-title">{flashcardSetTitle}</h1>
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

              <div className="create-option" onClick={handleEditorClick}>
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

            {loading && <p>Generating flashcards...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="popup-actions">
              <button onClick={closeUploadPopup} className="popup-cancel">
                Close
              </button>
              {uploadedFiles.length > 0 && (
                <button onClick={handleDone} className="popup-confirm">
                  Generate
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
