import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { FaRegStickyNote, FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/notes"); 
    }
  }, [navigate]);

  const handleStart = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/notes"); // If logged in, navigate to /notes
    } else {
      navigate("/login"); // If not logged in, navigate to /login
    }
  };
  
  return (
    <div className="home-container">
      <h1>Welcome to Note App!</h1>
      <p>Organize your notes easily and securely.</p>

      <div className="features">
        <div className="feature-item">
          <FaRegStickyNote className="feature-icon" />
          <h3>Organized Notes</h3>
          <p>Create, edit, and categorize your notes quickly.</p>
        </div>
        <div className="feature-item">
          <FaUser className="feature-icon" />
          <h3>Personalized Profile</h3>
          <p>Manage your information and preferences.</p>
        </div>
        <div className="feature-item">
          <FaLock className="feature-icon" />
          <h3>Security</h3>
          <p>Authentication and protection for your information.</p>
        </div>
      </div>

      <button className="start-btn" onClick={handleStart}>
        <FaSignInAlt /> Start Now
      </button>
    </div>
  );
}

export default Home;
