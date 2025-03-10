import React from "react";
import "../styles/AddNoteButton.css";

function AddNoteButton({ onClick }) {
  return (
    <button className="add-note-btn" onClick={onClick}>
      +
    </button>
  );
}

export default AddNoteButton;
