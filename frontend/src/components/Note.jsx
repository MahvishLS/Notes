import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

const Note = ({ id, title, text, date, handleDeleteNote, handleEditNote }) => {
  return (
    <div className="note">
      <div className="note-content">
        <h5>{title}</h5>
        <span>{text}</span>
      </div>

      <div className="note-footer">
        <small>{date}</small>
        <div className="footer-icons">
          <FaEdit
            onClick={() => handleEditNote({ id, title, text, date })}
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
