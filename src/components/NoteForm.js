import React, { useState } from 'react';

function NoteForm({ addNote }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addNote(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="📝 Write your note..."
        autoFocus
      />
      <button type="submit">➕ Add</button>
    </form>
  );
}

export default NoteForm;