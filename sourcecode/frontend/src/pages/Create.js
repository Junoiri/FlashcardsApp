import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleBackButtonClick = () => {
    setShowBackPopup(true); // Show the back confirmation popup
  };

  const confirmBackNavigation = () => {
    navigate(-1); // Navigate to the previous screen
  };

  const cancelBackNavigation = () => {
    setShowBackPopup(false); // Close the back popup
  };

  const handleAIOptionClick = () => {
    setShowUploadPopup(true); // Show the upload popup
  };

  const closeUploadPopup = () => {
    setShowUploadPopup(false); // Close the upload popup
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]); // Add the uploaded files to the list
  };

  const removeFile = (index) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((_, fileIndex) => fileIndex !== index)
    ); // Remove the file from the list
  };

  const handleDone = () => {
    console.log("Files uploaded:", uploadedFiles);
    closeUploadPopup(); // Close the popup after confirming
  };

  const navigateToEditor = () => {
    navigate("/editor"); // Navigate to the FlashcardEditor page
  };

  const navigateTo = (path) => {
    navigate(path); // Navigate to a specific route
  };

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
            <h1 className="create-title">Test Set</h1>
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
                  <span className="recommended-label">Recommended</span>
                  <h2>Generate flashcards with AI</h2>
                  <p>
                    Select files, topics, or text, and let AI generate custom
                    flashcards.
                  </p>
                </div>
                <img src={rightArrowIcon} alt="Arrow" className="right-arrow" />
              </div>

              <div className="create-option" onClick={navigateToEditor}>
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

      {/* Back Confirmation Popup */}
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

      {/* AI Upload Popup */}
      {showUploadPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Generate flashcards with AI</h2>
            <p>Drag or upload files (PDF, PPT, DOC) here.</p>
            <div className="file-upload-area">
              <label htmlFor="file-upload" className="upload-label">
                <img src={uploadIcon} alt="Upload Icon" />
                <span>Upload files</span>
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.ppt,.doc,.docx"
                multiple
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
            <div className="popup-actions">
              <button onClick={closeUploadPopup} className="popup-cancel">
                Close
              </button>
              {uploadedFiles.length > 0 && (
                <button onClick={handleDone} className="popup-confirm">
                  Done
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
