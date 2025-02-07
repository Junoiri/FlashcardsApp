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

/**
 * Library component displays the user's flashcard sets and provides options to create, edit, and delete flashcard sets.
 *
 * @returns {JSX.Element} The rendered Library component.
 */
const Library = () => {
  const navigate = useNavigate();
  const [flashcardSets, setFlashcardsSets] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("dateCreated");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newSetName, setNewSetName] = useState("");
  const [newSetCategory, setNewSetCategory] = useState("");
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editFlashcard, setEditFlashcard] = useState(null);
  const [deleteFlashcardId, setDeleteFlashcardId] = useState(null);

  useEffect(() => {
    /**
     * Fetches the user's flashcard sets from the server.
     */
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
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(response.data);

        const userFlashcardSets = Array.isArray(response.data)
          ? response.data.filter((set) => set.userId === user.id)
          : [];

        const updatedFlashcardSets = await Promise.all(
          userFlashcardSets.map(async (set) => {
            try {
              console.log(set._id);
              const flashcardsResponse = await axios.get(
                `http://localhost:8000/flashcards/set/${set._id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );

              return {
                ...set,
                flashcardsLength: flashcardsResponse.data.length,
              };
            } catch (error) {
              if (error.response?.status === 404) {
                console.warn(`No flashcards found for set ${set._id}`);
                return { ...set, flashcardsLength: 0 }; // ✅ Set length to 0 instead of failing
              }

              console.error(
                `Error fetching flashcards for set ${set._id}:`,
                error
              );
              return { ...set, flashcardsLength: 0 }; // ✅ Default to 0 on other errors
            }
          })
        );

        setFlashcardsSets(updatedFlashcardSets);
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

  /**
   * Fetches the current user's data from the server and sets the username state.
   */
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

  /**
   * Creates a new flashcard set.
   */
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

  /**
   * Navigates to the preview page for a flashcard set.
   *
   * @param {string} flashcardSetId - The ID of the flashcard set to preview.
   */
  const clickFlashcardSet = (flashcardSetId, flashcardSetTitle) => {
    localStorage.setItem("flashcardSetTitle", flashcardSetTitle);
    navigate(`/preview/${flashcardSetId}`);
  };

  /**
   * Closes the modal.
   */
  const closeModal = () => {
    setShowModal(false);
  };

  /**
   * Handles the edit button click event.
   * Sets the flashcard to be edited.
   *
   * @param {Object} flashcard - The flashcard to edit.
   */
  const handleEditClick = (flashcard) => {
    setEditFlashcard(flashcard);
  };

  /**
   * Handles the delete button click event.
   * Sets the flashcard ID to be deleted.
   *
   * @param {string} flashcardId - The ID of the flashcard to delete.
   */
  const handleDeleteClick = (flashcardId) => {
    setDeleteFlashcardId(flashcardId);
  };

  /**
   * Confirms the deletion of the flashcard.
   */
  const confirmDelete = async () => {
    if (!deleteFlashcardId) return;

    try {
      console.log("Delete Flashcard ID:", deleteFlashcardId);
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8000/flashcardsets/${deleteFlashcardId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFlashcardsSets((prevFlashcards) =>
        prevFlashcards.filter((fc) => fc._id !== deleteFlashcardId)
      );

      setDeleteFlashcardId(null);
    } catch (error) {
      console.error("Error deleting flashcard:", error.response?.data || error);
    }
  };

  /**
   * Saves the edited flashcard.
   */
  const handleSaveEdit = async () => {
    if (!editFlashcard || !editFlashcard._id) {
      console.error("Flashcard ID is missing:", editFlashcard);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      try {
        const response = await axios.patch(
          `http://localhost:8000/flashcardsets/${editFlashcard._id}`,
          {
            title: editFlashcard.setName,
            description: editFlashcard.description,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Update successful:", response.data);
      } catch (error) {
        console.error(
          "Error updating flashcard:",
          error.response?.data || error
        );
      }

      setFlashcardsSets(
        flashcardSets.map((fc) =>
          fc._id === editFlashcard._id ? editFlashcard : fc
        )
      );
      setEditFlashcard(null);
    } catch (error) {
      console.error("Error updating flashcard:", error);
    }
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
                  numFlashcards={card.flashcardsLength}
                  author={username}
                  onClick={() => clickFlashcardSet(card._id, card.title)}
                  onEdit={() => handleEditClick(card)}
                  onDelete={() => handleDeleteClick(card._id)}
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

      {showModal && (
        <div className="popup-overlay" onClick={(e) => e.stopPropagation()}>
          <div className="popup-content">
            <button className="popup-close-icon" onClick={closeModal}>
              ✖
            </button>
            <h2>Nothing to Learn Yet</h2>
            <p>
              It looks like there are no flashcards in this set. Please add some
              flashcards to start learning!
            </p>
            <button className="popup-close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {editFlashcard && (
        <div className="popup-overlay" onClick={(e) => e.stopPropagation()}>
          <div className="popup-content">
            <h2>Edit Flashcard Set</h2>

            <label>Set Name</label>
            <input
              type="text"
              value={editFlashcard.title}
              onChange={(e) =>
                setEditFlashcard({ ...editFlashcard, title: e.target.value })
              }
            />

            <label style={{ marginBottom: "8px", display: "block" }}>
              Category
            </label>
            <select
              value={editFlashcard.category}
              onChange={(e) =>
                setEditFlashcard({ ...editFlashcard, category: e.target.value })
              }
              style={{ marginBottom: "16px", padding: "8px" }}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <div className="popup-actions">
              <button
                onClick={() => setEditFlashcard(null)}
                className="popup-cancel"
              >
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="popup-confirm">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteFlashcardId && (
        <div className="popup-overlay" onClick={(e) => e.stopPropagation()}>
          <div className="popup-content">
            <p>Are you sure you want to delete this flashcard set?</p>
            <div className="popup-actions">
              <button onClick={confirmDelete} className="popup-confirm">
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteFlashcardId(null)}
                className="popup-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
