import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa'; 

const Note = ({ id, text, date, handleDeleteNote, handleEditNote }) => {
  return (
    <div className="note">
      <span>{text}</span>
      <div className="note-footer">
        <small>{date}</small>
        <div className="footer-icons">

        <FaEdit 
          onClick={() => handleEditNote({ id, text, date })}
          className="edit-icon" 
          size="1.3em" 
        />
        <MdDeleteForever 
          onClick={() => handleDeleteNote(id)}
          className="delete-icon" 
          size="1.4em" 
        />

        </div>
        
        
      </div>
    </div>
  );
};

export default Note;
