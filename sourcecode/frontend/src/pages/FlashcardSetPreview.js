import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/PreviewPage.css";
import backIcon from "../assets/back1.png";

const PreviewPage = () => {
  const { flashcardSetId } = useParams();
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useState([]);
  const [setTitle, setSetTitle] = useState("");

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/flashcardsets/${flashcardSetId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setSetTitle(response.data.title);
        setFlashcards(response.data.flashcards);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchFlashcards();
  }, [flashcardSetId]);

  return (
    <div className="preview-container">
      <div className="preview-header">
        <button className="back-button" onClick={() => navigate("/library")}>
          <img src={backIcon} alt="Back" className="back-icon" />
        </button>
        <h1 className="preview-title">Flashcard Set: {setTitle}</h1>
        <button className="start-learning-button">Start Learning</button>
      </div>

      <div className="content-container">
        <div className="flashcard-grid">
          {flashcards.map((flashcard, index) => (
            <div key={index} className="flashcard">
              <p className="flashcard-question">{flashcard.question}</p>
              <hr />
              <p className="flashcard-answer">{flashcard.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
