import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import Switch from "../components/Switch";  

function Header({ user, onLogout, onToggleDarkMode, darkMode }) {
  const [isDarkMode, setIsDarkMode] = useState(darkMode);

  useEffect(() => {
    setIsDarkMode(darkMode);
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    onToggleDarkMode(); 
  };

  return (
    <header className="header">
      <h1>Note App</h1>
      <nav>
        <ul>
          {!user && (
            <li>
              <Link to="/">Home</Link>
            </li>
          )}
          {user ? (
            <>
              <li>
                <span className="welcome-text">Olá, {user.username}!</span>
              </li>
              <li>
                <Link to="/notes">Notas</Link>
              </li>
              <li>
                <Link to="/profile">Perfil</Link>
              </li>
              <li>
                <button onClick={onLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>

      
      <Switch isDarkMode={isDarkMode} onToggleDarkMode={handleToggleDarkMode} />
    </header>
  );
}

export default Header;
