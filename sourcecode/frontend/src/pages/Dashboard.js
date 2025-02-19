import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import FlashcardBlock from "../components/FlashcardBlock";
import homeIcon from "../assets/home.png";
import libraryIcon from "../assets/music-library.png";
import settingsIcon from "../assets/settings.png";
import circleIcon from "../assets/circle.png";
import removeIcon from "../assets/remove.png";
import moreIcon from "../assets/more.png";
import { getCurrentUser } from "../services/Authentication";
import axios from "axios";

/**
 * Dashboard component displays the user's dashboard with recent flashcards, activity, and navigation options.
 *
 * @returns {JSX.Element} The rendered Dashboard component.
 */
const Dashboard = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
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
    fetchMe();
  });

  const initialFlashcards = [
    {
      setName: "Software Engineering",
      category: "Other",
      numFlashcards: "21",
    },
    {
      setName: "Mathematics",
      category: "Science",
      numFlashcards: "15",
    },
    {
      setName: "Physics",
      category: "Science",
      numFlashcards: "18",
    },
  ];
  const [flashcards, setFlashcards] = useState(initialFlashcards);

  /**
   * Navigates to the specified path.
   *
   * @param {string} path - The path to navigate to.
   */
  const navigateTo = (path) => {
    window.location.href = path;
  };

  const days = [
    { day: "Mon", date: "Feb 3", activity: false },
    { day: "Tue", date: "Feb 4", activity: false },
    { day: "Wed", date: "Feb 5", activity: false },
    { day: "Thu", date: "Feb 6", activity: true },
    { day: "Fri", date: "Feb 7", activity: false },
    { day: "Sat", date: "Feb 8", activity: false },
    { day: "Sun", date: "Feb 9", activity: true },
  ];

  const moreFlashcards = [
    {
      setName: "History",
      category: "Social Studies",
      numFlashcards: "10",
      author: "Anna Brown",
    },
    {
      setName: "Biology",
      category: "Science",
      numFlashcards: "25",
      author: "Charles Darwin",
    },
    {
      setName: "Art",
      category: "Humanities",
      numFlashcards: "12",
      author: "Leonardo Da Vinci",
    },
  ];

  /**
   * Loads more flashcards into the state.
   */
  const loadMoreFlashcards = () => {
    setFlashcards([...flashcards, ...moreFlashcards]);
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
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

      <main className="dashboard-main">
        <div className="content-placeholder">
          <div className="transparent-rectangle">
            <p className="welcome-message">Welcome {username}!</p>
            <div className="activity-header">
              <h2>Your Activity</h2>
              <div className="activity-days">
                {days.map((day, index) => (
                  <div key={index} className="activity-day">
                    <span className="day-label">{day.day}</span>
                    <span className="date-label">{day.date}</span>
                    <img
                      src={day.activity ? circleIcon : removeIcon}
                      alt={day.activity ? "Activity" : "No Activity"}
                      className="activity-icon"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flashcards-header">
              <h2>Your Recent Flashcards</h2>
              <div className="flashcards-grid">
                {flashcards.map((card, index) => (
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
              <button className="load-more-button" onClick={loadMoreFlashcards}>
                <img
                  src={moreIcon}
                  alt="Load more"
                  className="load-more-icon"
                />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
