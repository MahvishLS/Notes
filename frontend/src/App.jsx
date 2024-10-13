import React from 'react';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';
import EditNoteModal from './components/EditNoteModal'; 

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      title: "Note 1",
      text: "This is my first note!",
      date: "05/10/2024"
    },
    {
      id: nanoid(),
      title: "Note 2",
      text: "This is my second note!",
      date: "01/10/2024"
    },
    {
      id: nanoid(),
      title: "Note 3",
      text: "This is my third note!",
      date: "29/09/2024"
    },
  ]);

  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [currentNote, setCurrentNote] = useState(null);  

  const addNote = (title, text) => { 
    const date = new Date();
    const newNote = {
      id: nanoid(),
      title: title, 
      text: text,
      date: date.toLocaleDateString()
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const openEditModal = (note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const handleEditNote = (updatedNote) => { 
    setNotes(notes.map((note) => 
      note.id === currentNote.id ? { ...note, ...updatedNote } : note 
    ));
    setIsModalOpen(false);
  };

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            (note.text.toLowerCase().includes(searchText.toLowerCase()) || 
            note.title.toLowerCase().includes(searchText.toLowerCase()))
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
          handleEditNote={openEditModal} 
        />
        {isModalOpen && (
          <EditNoteModal 
            note={currentNote} 
            handleEditNote={handleEditNote} 
            handleClose={() => setIsModalOpen(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default App;
