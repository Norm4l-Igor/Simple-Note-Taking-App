import React, { useState, useEffect } from "react";
import "../styles/NoteModal.css";

function NoteModal({ isOpen, onClose, onSave, noteToEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setCategory(noteToEdit.category || "");
      setImage(noteToEdit.image || null);
    } else {
      setTitle("");
      setContent("");
      setCategory("");
      setImage(null);
    }
  }, [noteToEdit]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title || !content) {
      alert("Title and content cannot be empty!");
      return;
    }
    onSave({ title, content, category, image });
    onClose();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{noteToEdit ? "Edit Note" : "New Note"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Type your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Category (e.g., Work, Studies)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && <img src={image} alt="Preview" className="image-preview" />}
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>{noteToEdit ? "Update" : "Save"}</button>
        </div>
      </div>
    </div>
  );
}

export default NoteModal;