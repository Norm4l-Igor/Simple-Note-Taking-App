import React, { useState, useEffect, useRef } from "react";
import AddNoteButton from "../components/AddNoteButton";
import NoteModal from "../components/NoteModal";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../styles/Notes.css";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const nodeRefs = useRef(new Map());

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const saveNotesToLocalStorage = (updatedNotes) => {
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleAddNote = () => {
    setNoteToEdit(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveNote = (newNote) => {
    let updatedNotes;
    if (noteToEdit) {
      updatedNotes = notes.map((note) =>
        note === noteToEdit ? newNote : note
      );
    } else {
      updatedNotes = [...notes, newNote];
    }
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
    setIsModalOpen(false);
  };

  const handleEditNote = (note) => {
    setNoteToEdit(note);
    setIsModalOpen(true);
  };

  const handleDeleteNote = (noteToDelete) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      const updatedNotes = notes.filter((note) => note !== noteToDelete);
      setNotes(updatedNotes);
      saveNotesToLocalStorage(updatedNotes);
    }
  };

  const filteredNotes = notes.filter((note) =>
    (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === "" || note.category === selectedCategory)
  );

  const uniqueCategories = [...new Set(notes.map((note) => note.category))];

  return (
    <div className="notes-container">
      <h1>My Notes</h1>

      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {uniqueCategories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Display "No notes found." only if there are no notes */}
      {filteredNotes.length === 0 && notes.length === 0 && (
        <p>No notes found.</p>
      )}

      <div className="notes-grid">
        <TransitionGroup component={null}>
          {filteredNotes.map((note, index) => {
            const nodeRef = nodeRefs.current.get(index) || React.createRef();
            nodeRefs.current.set(index, nodeRef);

            return (
              <CSSTransition key={index} timeout={300} classNames="fade" nodeRef={nodeRef}>
                <div ref={nodeRef} className="note-item">
                  <div className="note-header">
                    <span className="note-title">{note.title}</span>
                    <div className="note-actions">
                      <button className="edit-btn" onClick={() => handleEditNote(note)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDeleteNote(note)}>Delete</button>
                    </div>
                  </div>
                  {note.image && <img src={note.image} alt="Note" className="note-image" />}
                  <p className="note-content">{note.content}</p>
                  <div className="note-footer">
                    <span className="note-date">{note.date}</span>
                    <span className="note-category">{note.category || "No category"}</span>
                  </div>
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>

      <NoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveNote}
        noteToEdit={noteToEdit}
      />

      <AddNoteButton onClick={handleAddNote} />
    </div>
  );
}

export default Notes;
