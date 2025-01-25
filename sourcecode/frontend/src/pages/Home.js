import React, { useState, useRef } from "react";
import "../styles/Home.css";
import checkIcon from "../assets/check.png";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const mainContentRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const featuresSectionRef = useRef(null);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
    setIsRegister(false);
  };

  const switchToRegister = () => setIsRegister(true);

  const switchToLogin = () => setIsRegister(false);

  /**
   * Scrolls to the specified section smoothly
   * @param {Object} sectionRef - The reference to the section to scroll to
   */
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-container">
      <nav className="flex items-center justify-between p-4 bg-ccd5ae shadow-md">
        <div className="text-3xl font-serif tracking-wide text-white">
          Flashcards<span className="text-faedcd">App</span>
        </div>
        <button
          className="bg-faedcd text-gray-800 px-4 py-2 rounded-md hover:bg-e9edc9"
          onClick={toggleModal}
        >
          Get Started
        </button>
      </nav>

      <div ref={mainContentRef} className="main-content relative">
        <main className="flex flex-col items-center justify-center min-h-full text-9ea780">
          <h1 className="text-6xl font-bold mb-4">
            Revolutionize Your Study Experience
          </h1>
          <p className="text-lg mb-6">
            FlashcardsApp - Transform your documents into effective study tools
            effortlessly.
          </p>
          <button
            className="bg-faedcd text-gray-800 px-6 py-3 rounded-md hover:bg-e9edc9"
            onClick={toggleModal}
          >
            Try It Now
          </button>
        </main>
        <button
          className="scroll-button first-section"
          onClick={() => scrollToSection(aboutSectionRef)}
        ></button>
      </div>

      <div ref={aboutSectionRef} className="about-section relative">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Welcome to FlashcardsApp</h2>
          <p className="text-lg leading-relaxed">
            At FlashcardsApp, we leverage advanced natural language processing
            to help you create study flashcards from your documents in just a
            few clicks. Our mobile-first web application is designed for
            students, professionals, and lifelong learners who want to maximize
            their study efficiency and retain information better.
          </p>
        </div>
        <button
          className="scroll-button"
          onClick={() => scrollToSection(featuresSectionRef)}
        ></button>
      </div>

      <div ref={featuresSectionRef} className="features-section">
        <h2 className="text-4xl font-bold mb-8 text-center">Our Features</h2>
        <div className="grid">
          <div className="feature-item">
            <img src={checkIcon} alt="Check Icon" className="feature-icon" />
            <h3>Document Uploading</h3>
            <p>
              Easily upload PDF or DOCX files for instant flashcard generation.
            </p>
            <button className="discover-more">Discover More</button>
          </div>
          <div className="feature-item">
            <img src={checkIcon} alt="Check Icon" className="feature-icon" />
            <h3>Automated Flashcard Creation</h3>
            <p>
              Save time with our smart NLP technology that creates flashcards
              automatically.
            </p>
            <button className="discover-more">Discover More</button>
          </div>
          <div className="feature-item">
            <img src={checkIcon} alt="Check Icon" className="feature-icon" />
            <h3>Study Anywhere Anytime</h3>
            <p>
              Access your flashcards on any device, making studying flexible and
              convenient.
            </p>
            <button className="discover-more">Discover More</button>
          </div>
        </div>
        <button
          className="scroll-to-top-button"
          onClick={() => scrollToSection(mainContentRef)}
        ></button>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={toggleModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">
              {isRegister
                ? "Create Your Account"
                : "Wait a minute! You need to log in first to use the full functionality"}
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Enter Email / Phone No"
                className="form-input"
              />
              <input
                type="password"
                placeholder="Passcode"
                className="form-input"
              />
              {isRegister && (
                <>
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="form-input"
                  />
                </>
              )}
              <button className="bg-9ea780 text-gray-800 px-4 py-2 rounded-md hover:bg-e9edc9">
                {isRegister ? "Register" : "Sign In"}
              </button>
            </form>

            {isRegister ? (
              <p className="text-sm mt-4">
                Already have an account?{" "}
                <button
                  className="text-9ea780 font-bold hover:underline"
                  onClick={switchToLogin}
                >
                  Login
                </button>
              </p>
            ) : (
              <p className="text-sm mt-4">
                Don’t have an account?{" "}
                <button
                  className="text-9ea780 font-bold hover:underline"
                  onClick={switchToRegister}
                >
                  Register
                </button>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
