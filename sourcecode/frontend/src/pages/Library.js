import React, { useState, useEffect } from "react";
import "../styles/Library.css";
import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/home.png";
import libraryIcon from "../assets/music-library.png";
import settingsIcon from "../assets/settings.png";
import plusIcon from "../assets/plus.png";
import closeIcon from "../assets/close.png";
import FlashcardBlock from "../components/FlashcardBlock";
import axios from "axios";
import { getCurrentUser } from "../services/Authentication";

const Library = () => {
  const navigate = useNavigate();
  const [flashcardSets, setFlashcardsSets] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("dateCreated");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newSetName, setNewSetName] = useState("");
  const [newSetCategory, setNewSetCategory] = useState("");
  const [username, setUsername] = useState("");
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const [editingFlashcardSet, setEditingFlashcardSet] = useState(null);

  useEffect(() => {
    const fetchFlashcardSets = async () => {
      try {
        const user = getCurrentUser();
        if (!user) {
          console.error("No valid user found.");
          return;
        }

        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:8000/flashcardsets`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userFlashcardSets = Array.isArray(response.data)
          ? response.data.filter((set) => set.userId === user.id)
          : [];

        setFlashcardsSets(userFlashcardSets);
      } catch (error) {
        console.error(
          "Error fetching flashcards:",
          error.response?.data || error
        );
      }
    };

    fetchFlashcardSets();

    fetchMe();
  }, []);

  const fetchMe = async () => {
    try {
      const user = getCurrentUser();
      if (!user) {
        console.error("No valid user found.");
        return;
      }

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8000/users/${user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsername(response.data.username);
    } catch (error) {
      console.error("Error fetching user:", error.response?.data || error);
    }
  };

  const createFlashcardSet = async () => {
    try {
      const user = getCurrentUser();
      if (!user) {
        console.error("No valid user found.");
        return;
      }

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:8000/flashcardsets`,
        {
          username: username,
          title: newSetName,
          description: newSetCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setFlashcardsSets((prevSets) => [...prevSets, response.data]);
      setIsPopupVisible(false);
    } catch (error) {
      console.error(
        "Error creating flashcard set:",
        error.response?.data || error
      );
    }
  };

  const deleteFlashcardSet = async (flashcardSetId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8000/flashcardsets/${flashcardSetId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFlashcardsSets((prevSets) =>
        prevSets.filter((set) => set._id !== flashcardSetId)
      );
    } catch (error) {
      console.error(
        "Error deleting flashcard set:",
        error.response?.data || error
      );
    }
  };

  const editFlashcardSet = (flashcardSet) => {
    setEditingFlashcardSet(flashcardSet);
    setIsEditPopupVisible(true);
  };

  const handleSaveEdit = async () => {
    if (editingFlashcardSet) {
      try {
        const token = localStorage.getItem("token");

        await axios.patch(
          `http://localhost:8000/flashcardsets/${editingFlashcardSet._id}`,
          {
            title: editingFlashcardSet.title,
            category: editingFlashcardSet.category,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFlashcardsSets((prevSets) =>
          prevSets.map((set) =>
            set._id === editingFlashcardSet._id ? editingFlashcardSet : set
          )
        );
        setIsEditPopupVisible(false);
      } catch (error) {
        console.error(
          "Error updating flashcard set:",
          error.response?.data || error
        );
      }
    }
  };

  const clickFlashcardSet = (flashcardSetId) => {
    navigate(`/preview/${flashcardSetId}`);
  };

  const categories = [
    "All",
    "Math",
    "Science",
    "History",
    "Literature",
    "Geography",
    "Art",
    "Music",
    "Physics",
    "Chemistry",
    "Biology",
    "Philosophy",
    "Psychology",
    "Economics",
    "Sociology",
    "Law",
    "Engineering",
    "Technology",
    "Language",
    "Computer Science",
    "Political Science",
  ];

  const filteredFlashcards = flashcardSets.filter(
    (fc) => categoryFilter === "All" || fc.category === categoryFilter
  );

  const sortedFlashcards = filteredFlashcards.sort((a, b) => {
    if (sortOption === "dateCreated") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOption === "dateViewed") {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    }
    return 0;
  });

  return (
    <div className="library-container">
      <aside className="library-sidebar">
        <ul>
          <li onClick={() => (window.location.href = "/dashboard")}>
            <img src={homeIcon} alt="Home" />
            <a href="/dashboard">Home</a>
          </li>
          <li onClick={() => (window.location.href = "/library")}>
            <img src={libraryIcon} alt="Library" />
            <a href="/library">Library</a>
          </li>
          <li onClick={() => (window.location.href = "/settings")}>
            <img src={settingsIcon} alt="Settings" />
            <a href="/settings">Settings</a>
          </li>
        </ul>
      </aside>

      <main className="library-main">
        <div className="content-placeholder">
          <div className="transparent-rectangle">
            <h1 className="library-title">Library</h1>

            <div className="filter-sort-container">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="category-filter"
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="sort-options"
              >
                <option value="dateCreated">Date Created</option>
                <option value="dateViewed">Date Viewed</option>
              </select>

              <button
                className="create-study-set-button"
                onClick={() => setIsPopupVisible(true)}
              >
                <img src={plusIcon} alt="Add" /> Create Study Set
              </button>
            </div>

            <div className="flashcards-grid">
              {sortedFlashcards.map((card, index) => (
                <FlashcardBlock
                  key={index}
                  setName={card.title}
                  category={card.category}
                  numFlashcards={card.flashcards ? card.flashcards.length : 0}
                  author={username}
                  onClick={() => clickFlashcardSet(card._id)}
                  onDelete={deleteFlashcardSet}
                  onEdit={() => editFlashcardSet(card)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <img
              src={closeIcon}
              alt="Close"
              className="popup-close-icon"
              onClick={() => setIsPopupVisible(false)}
            />
            <h2>Create Study Set</h2>
            <div className="popup-input">
              <label>Study Set Name</label>
              <input
                type="text"
                value={newSetName}
                onChange={(e) => setNewSetName(e.target.value)}
                placeholder="Enter set name"
              />
            </div>
            <div className="popup-input">
              <label>Category</label>
              <select
                value={newSetCategory}
                onChange={(e) => setNewSetCategory(e.target.value)}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="popup-actions">
              <button
                onClick={() => setIsPopupVisible(false)}
                className="popup-cancel"
              >
                Cancel
              </button>
              <button className="popup-confirm" onClick={createFlashcardSet}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditPopupVisible && editingFlashcardSet && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Edit Flashcard Set</h2>
            <div className="popup-input">
              <label>Study Set Name</label>
              <input
                type="text"
                value={editingFlashcardSet.title}
                onChange={(e) =>
                  setEditingFlashcardSet({
                    ...editingFlashcardSet,
                    title: e.target.value,
                  })
                }
                placeholder="Enter set name"
              />
            </div>
            <div className="popup-input">
              <label>Category</label>
              <select
                value={editingFlashcardSet.category}
                onChange={(e) =>
                  setEditingFlashcardSet({
                    ...editingFlashcardSet,
                    category: e.target.value,
                  })
                }
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="popup-actions">
              <button
                onClick={() => setIsEditPopupVisible(false)}
                className="popup-cancel"
              >
                Cancel
              </button>
              <button className="popup-confirm" onClick={handleSaveEdit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
