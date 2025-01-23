// Library.js
import React, { useState } from "react";
import "../styles/Library.css";
import homeIcon from "../assets/home.png";
import libraryIcon from "../assets/music-library.png";
import settingsIcon from "../assets/settings.png";
import helpIcon from "../assets/help.png";
import plusIcon from "../assets/plus.png";
import FlashcardBlock from "../components/FlashcardBlock";

const Library = () => {
  const navigateTo = (path) => {
    window.location.href = path;
  };

  const flashcards = [
    {
      setName: "Software Engineering",
      category: "Other",
      numFlashcards: "21",
      author: "John Doe",
      dateCreated: "2023-01-20",
      dateViewed: "2023-01-22",
    },
    {
      setName: "Mathematics",
      category: "Science",
      numFlashcards: "15",
      author: "Jane Smith",
      dateCreated: "2023-01-15",
      dateViewed: "2023-01-18",
    },
    {
      setName: "Physics",
      category: "Science",
      numFlashcards: "18",
      author: "Albert Einstein",
      dateCreated: "2023-01-10",
      dateViewed: "2023-01-20",
    },
  ];

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("dateCreated");

  const categories = ["All", ...new Set(flashcards.map((fc) => fc.category))];

  const filteredFlashcards = flashcards.filter(
    (fc) => categoryFilter === "All" || fc.category === categoryFilter
  );

  const sortedFlashcards = filteredFlashcards.sort((a, b) => {
    if (sortOption === "dateCreated") {
      return new Date(b.dateCreated) - new Date(a.dateCreated);
    } else if (sortOption === "dateViewed") {
      return new Date(b.dateViewed) - new Date(a.dateViewed);
    }
    return 0;
  });

  return (
    <div className="library-container">
      <aside className="library-sidebar">
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
                onClick={() => console.log("Creating a new study set...")}
              >
                <img src={plusIcon} alt="Add" /> Create Study Set
              </button>
            </div>

            <div className="flashcards-grid">
              {sortedFlashcards.map((card, index) => (
                <FlashcardBlock
                  key={index}
                  setName={card.setName}
                  category={card.category}
                  numFlashcards={card.numFlashcards}
                  author={card.author}
                  onClick={() => console.log(`Navigating to ${card.setName}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Library;
