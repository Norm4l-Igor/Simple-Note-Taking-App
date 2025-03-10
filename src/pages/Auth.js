import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const currentUser = localStorage.getItem("currentUser");
    if (isLoggedIn && currentUser) {
      window.location.href = "/notes";
    }
  }, []);

  const toggleAuthMode = () => {
    setIsRegister(!isRegister);
    setUsername("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleRegister = () => {
    if (username && email && password) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = users.some(user => user.email === email || user.username === username);

      if (userExists) {
        setError("This email or username is already registered!");
      } else {
        const newUser = { username, email, password };
        localStorage.setItem("users", JSON.stringify([...users, newUser]));
        setError("");
        alert("Successful registration! Log in now.");
        toggleAuthMode();
      }
    } else {
      setError("All fields are required!");
    }
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(user => 
      (user.email === email || user.username === email) && 
      user.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
      setError("");
      window.location.href = "/notes";
    } else {
      setError("Incorrect email, username, or password!");
    }
  };

  return (
    <div className={`container ${isRegister ? "active" : ""}`}>
      <div className="form-box login">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="button" className="btn" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>

      <div className="form-box register">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Register</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="button" className="btn" onClick={handleRegister}>
            Register
          </button>
        </form>
      </div>

      <div className="toggle-box">
        <div className="toggle-panel toggle-left">
          <h1>Hello, <br /> Welcome to our website</h1>
          <p>Don't have an account?</p>
          <button className="btn register-btn" onClick={toggleAuthMode}>
            Register
          </button>
        </div>
        <div className="toggle-panel toggle-right">
          <h1>Welcome back!</h1>
          <p>Already have an account?</p>
          <button className="btn login-btn" onClick={toggleAuthMode}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
