import React from 'react';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';
import EditNoteModal from './components/EditNoteModal'; 

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first note!",
      date: "05/10/2024"
    },
    {
      id: nanoid(),
      text: "This is my second note!",
      date: "01/10/2024"
    },
    {
      id: nanoid(),
      text: "This is my third note!",
      date: "29/09/2024"
    },
  ]);

  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [currentNote, setCurrentNote] = useState(null);  

  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem('react-notes-app-data')
    );

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  // Open modal for editing note
  const openEditModal = (note) => {
    setCurrentNote(note); // Set the note to edit
    setIsModalOpen(true); // Show modal
  };

  // Handle note update
  const handleEditNote = (updatedText) => {
    setNotes(notes.map((note) => 
      note.id === currentNote.id ? { ...note, text: updatedText } : note
    ));
    setIsModalOpen(false); // Close modal after update
  };

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
          handleEditNote={openEditModal} // Pass edit function
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
