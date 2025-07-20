import React, { useState, useRef, useEffect } from 'react';

function Note({ note, deleteNote, editNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(note.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) inputRef.current.focus();
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed) {
      editNote(note.id, trimmed);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(note.text);
    setIsEditing(false);
  };

  return (
    <div className="note">
      {isEditing ? (
        <>
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <div>
            <button onClick={handleSave}>✅ Save</button>
            <button onClick={handleCancel}>❌ Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p>{note.text}</p>
          <p style={{ fontSize: '12px', color: '#aaa' }}>{note.date}</p>
          <div>
            <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
            <button onClick={() => deleteNote(note.id)}>🗑️ Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Note;
