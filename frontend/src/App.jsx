import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';
import EditNoteModal from './components/EditNoteModal'; 
import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notes');
        const fetchedNotes = response.data.map(note => ({
          id: note._id,  
          title: note.title,
          text: note.content,  
          date: new Date(note.createdAt).toLocaleDateString()
        }));
        setNotes(fetchedNotes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const addNote = async (title, text) => {
    const date = new Date();
    const newNote = {
      title,
      content: text,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/notes', newNote);
      const savedNote = {
        id: response.data._id,
        title: response.data.title,
        text: response.data.content,
        date: date.toLocaleDateString(),
      };
      setNotes([...notes, savedNote]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      const newNotes = notes.filter((note) => note.id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
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
