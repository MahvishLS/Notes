import React from 'react';
import { useState } from 'react';

const AddNote = ({ handleAddNote }) => {
  const [title, settitle] = useState(''); 
  const [text, settext] = useState('');
  const characterLimit = 500;

  const handleChange = (event) => {
    if (characterLimit - event.target.value.length >= 0) {
      settext(event.target.value);
    }
  };

  const handleSaveClick = () => {
    const finalTitle = title.trim().length > 0 ? title : "Untitled"; 
    if (text.trim().length > 0) {
      handleAddNote(finalTitle, text);
      settext('');
      settitle(''); 
    }
  };
  

  return (
    <div className="new">
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => settitle(e.target.value)} 
      />
      <hr />
      <textarea 
        rows="8" 
        cols="130" 
        placeholder="Type to add a note"
        value={text}
        onChange={handleChange}
      ></textarea>
      <div className="note-footer">
        <small>{characterLimit - text.length} Remaining</small>
        <button className="save" onClick={handleSaveClick}>Save</button>
      </div>
    </div>
  );
};

export default AddNote;
