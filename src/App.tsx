import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RichTextEditor from './components/RichTextEditor/RichTextEditor';
import NoteList from './components/NotesList/NotesList';

type Note = { id: number; content: string };

const getNotesFromStorage = (): Note[] => {
  const storedNotes = localStorage.getItem('notes');
  return storedNotes ? JSON.parse(storedNotes) : [];
};

const saveNotesToStorage = (notes: Note[]) => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

export default function App() {
  const [notes, setNotes] = useState<Note[]>(getNotesFromStorage);
  const [noteContent, setNoteContent] = useState<string>('');

  useEffect(() => {
    saveNotesToStorage(notes);
  }, [notes]);

  const handleReorder = (reorderedNotes: Note[]) => {
    setNotes(reorderedNotes);
  };

  const addNote = () => {
    if (noteContent.trim()) {
      const newNote = { id: Date.now(), content: noteContent };
      setNotes([...notes, newNote]);
      setNoteContent('');
    }
  };

  const editNote = (id: number, newContent: string) => {
    setNotes(notes.map(note => (note.id === id ? { ...note, content: newContent } : note)));
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const buttonStyle = {
    width: '20rem',
    height: '2rem',
    backgroundColor: 'lightcoral',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
    marginTop: '3rem',
  };

  const buttonHoverStyle = {
    backgroundColor: 'white',
    color: 'lightcoral',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <RichTextEditor value={noteContent} onChange={setNoteContent} />
                <button
                  style={buttonStyle}
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
                  onMouseLeave={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
                  onClick={addNote}
                >
                  Add Note
                </button>
                <NoteList
                  notes={notes}
                  onEdit={editNote}
                  onDelete={deleteNote}
                  onReorder={handleReorder}
                />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}