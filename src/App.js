import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/global.css";
 import ErrorCompo from './components/ErrorCompo';

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn && savedUser) {
      setUser(savedUser);
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/#/login";
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };

  return (
    <ErrorCompo>
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <Router>
        <Header user={user} onLogout={handleLogout} onToggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/notes" element={user ? <Notes /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
        </Routes>
        <Footer />
      </Router>
    </div>
    </ErrorCompo>
  );
}

export default App;
