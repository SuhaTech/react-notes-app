import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import Note from './components/Note';
import './App.css';

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const newNote = {
      id: Date.now(),
      text,
      date: new Date().toLocaleString()
    };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (id, newText) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, text: newText } : note
    );
    setNotes(updatedNotes);
  };

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  return (
    <div className="App">
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      <h1>📝 Notes App</h1>
      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-bar"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <span
            className="clear-icon"
            onClick={() => setSearchTerm('')}
            title="Clear"
          >
            ❌
          </span>
        )}
      </div>


      <NoteForm addNote={addNote} />
      <div className="notes-list">
        {notes
          .filter((note) => note.text.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((note) => (
            <Note key={note.id} note={note} deleteNote={deleteNote} editNote={editNote} />
          ))}
      </div>

      {notes.length > 0 && (
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete all notes?')) {
              setNotes([]);
              localStorage.removeItem('notes');
            }
          }}
          style={{
            marginTop: '20px',
            padding: '10px 18px',
            background: 'crimson',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🧹 Clear All Notes
        </button>
      )}
    </div>
  );
}

export default App;