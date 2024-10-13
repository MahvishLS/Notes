import React, { useState } from 'react';
import './Modal.css';

const EditNoteModal = ({ note, handleEditNote, handleClose }) => {
  const [updatedTitle, setUpdatedTitle] = useState(note.title);
  const [updatedText, setUpdatedText] = useState(note.text);

  const handleSave = () => {
    handleEditNote({ ...note, title: updatedTitle, text: updatedText });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Note</h2>
        <div className="edit-content">
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            placeholder="Title"
          />
          <hr />
          <textarea
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            placeholder="Edit your note here"
          />
        </div>
        <button onClick={handleSave} className='edit-section-btn'>Save</button>
        <button onClick={handleClose} className='edit-section-btn'>Close</button>
      </div>
    </div>
  );
};

export default EditNoteModal;
