import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      navigate("/notes");
    }
  }, [navigate]);

  const encryptPassword = (password) => {
    return btoa(password);
  };

  const isPasswordCorrect = (inputPassword, storedPassword) => {
    return encryptPassword(inputPassword) === storedPassword;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      setErrorMessage("Please fill in all fields!");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setErrorMessage("Please enter a valid email!");
      return;
    }

    const existingUser = JSON.parse(localStorage.getItem("user"));

    if (existingUser) {
      if (existingUser.email === email && isPasswordCorrect(password, existingUser.password)) {
        onLogin(existingUser);
        navigate("/notes");
      } else {
        setErrorMessage("Incorrect email or password!");
      }
    } else {
      const userData = { name, email, password: encryptPassword(password) };
      localStorage.setItem("user", JSON.stringify(userData));
      onLogin(userData);
      navigate("/notes");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login / Register</button>
      </form>
    </div>
  );
}

export default Login;
