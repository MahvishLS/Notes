import React from 'react';
import Note from './Note';
import AddNote from './AddNote';

const NotesList = ({ notes, handleAddNote, handleDeleteNote, handleEditNote }) => {
  return (
    <>
      <AddNote handleAddNote={handleAddNote} />
      <div className='notes-list'>
        {notes.map((note) => (
          <Note 
            key={note.id} 
            id={note._id} 
            title={note.title} 
            text={note.text} 
            date={note.date} 
            handleDeleteNote={handleDeleteNote}
            handleEditNote={handleEditNote}  
          />
        ))}
      </div>
    </>
  );
};

export default NotesList;