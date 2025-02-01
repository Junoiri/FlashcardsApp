import React, { useState, useRef } from "react";
import "../styles/Home.css";
import checkIcon from "../assets/check.png";
import { authenticateUser } from "../services/Authentication";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeat: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (type, message) => {
    toast(message, {
      className:
        type === "success"
          ? "toastify-success"
          : type === "error"
          ? "toastify-error"
          : "toastify-default",
    });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    console.log("Sending request:", isRegister, formData);

    const result = await authenticateUser(isRegister, formData);

    if (!result.success) {
      setErrors(result.errors || {});
      showToast("error", result.message || "Please fix the errors");
      return;
    }

    showToast(
      "success",
      `${isRegister ? "Registration" : "Login"} successful!`
    );

    if (isRegister) {
      setIsRegister(false);
      setFormData({ email: "", password: "", username: "", repeat: "" });
      setErrors({});
    } else {
      setShowModal(false);
      window.location.href = "/dashboard";
    }
  };

  const mainContentRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const featuresSectionRef = useRef(null);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
    setIsRegister(false);
  };

  const switchToRegister = () => setIsRegister(true);

  const switchToLogin = () => setIsRegister(false);

  //TODO: fix scrolls it goes only down
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-container">
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <nav className="flex items-center justify-between p-4 bg-ccd5ae shadow-md">
        <div className="text-3xl font-serif tracking-wide text-white">
          Flashcards<span className="text-faedcd">App</span>
        </div>
        <button
          className="bg-faedcd text-gray-800 px-3 py-2 rounded-md hover:bg-e9edc9"
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
            <div className="input-wrapper">
              <form className="space-y-4" onSubmit={handleAuth}>
                {isRegister && (
                  <input
                    type="text"
                    name="username"
                    placeholder={
                      errors.username ? "Username is required" : "Username"
                    }
                    className={`form-input ${
                      errors.username ? "input-error" : ""
                    }`}
                    value={formData.username}
                    onChange={handleChange}
                  />
                )}

                <input
                  type="email"
                  name="email"
                  placeholder={errors.email ? "Email is required" : "Email"}
                  className={`form-input ${errors.email ? "input-error" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                />

                <input
                  type="password"
                  name="password"
                  placeholder={
                    errors.password ? "Password is required" : "Password"
                  }
                  className={`form-input ${
                    errors.password ? "input-error" : ""
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                />

                {isRegister && (
                  <input
                    type="password"
                    name="repeat"
                    placeholder={
                      errors.repeat ? "Passwords must match" : "Repeat Password"
                    }
                    className={`form-input ${
                      errors.repeat ? "input-error" : ""
                    }`}
                    value={formData.repeat}
                    onChange={handleChange}
                  />
                )}

                <button className="bg-9ea780 text-gray-800 px-4 py-2 rounded-md hover:bg-e9edc9">
                  {isRegister ? "Register" : "Sign In"}
                </button>
              </form>
            </div>

            {isRegister ? (
              <p className="text-sm mt-4">
                Already have an account?{" "}
                <button
                  className="text-595d4d font-bold hover:underline"
                  onClick={switchToLogin}
                >
                  Login
                </button>
              </p>
            ) : (
              <p className="text-sm mt-4">
                Don’t have an account?{" "}
                <button
                  className="text-595d4d font-bold hover:underline"
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
