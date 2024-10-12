import React, { useState } from 'react';
import './Modal.css'; 

const EditNoteModal = ({ note, handleEditNote, handleClose }) => {
  const [updatedText, setUpdatedText] = useState(note.text);

  const handleSave = () => {
    handleEditNote(updatedText);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Note</h2>
        <textarea 
          value={updatedText} 
          onChange={(e) => setUpdatedText(e.target.value)} 
          placeholder="Edit your note here"
        />
        <br />
        <button onClick={handleSave} className='edit-section-btn'>Save</button>
        <button onClick={handleClose} className='edit-section-btn'>Close</button>
      </div>
    </div>
  );
};

export default EditNoteModal;
