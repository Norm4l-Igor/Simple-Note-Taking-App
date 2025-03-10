import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import { FaUser, FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

function Profile() {
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = () => {
    if (newPassword.trim() === "") {
      alert("The new password cannot be empty.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, password: newPassword } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify({ ...user, password: newPassword }));
    setUser({ ...user, password: newPassword });
    setNewPassword("");
    setIsEditing(false);
    alert("Password changed successfully!");
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {user && (
        <div className="profile-details">
          <div className="profile-item">
            <FaUser className="profile-icon" />
            <span>Username: {user.username}</span>
          </div>
          <div className="profile-item">
            <FaEnvelope className="profile-icon" />
            <span>Email: {user.email}</span>
          </div>
          <div className="profile-item">
            <FaLock className="profile-icon" />
            <span>Password: {showPassword ? user.password : "****"}</span>
            <button className="eye-btn" onClick={handleTogglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {isEditing ? (
            <div className="profile-item">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button className="save-btn" onClick={handleChangePassword}>
                Save Password
              </button>
            </div>
          ) : (
            <button className="change-password-btn" onClick={() => setIsEditing(true)}>
              Change Password
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
