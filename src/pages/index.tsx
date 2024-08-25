import React, { useState, useEffect } from 'react';
import NoteList from '../components/NotesList/NotesList';
import { getNotesFromStorage, saveNotesToStorage } from '../utils/storage';

interface Note {
  id: number;
  content: string;
}

const IndexPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(getNotesFromStorage());

  useEffect(() => {
    console.log('Saving notes:', notes);
    saveNotesToStorage(notes);
  }, [notes]);

  const addNote = (content: string) => {
    const newNote = { id: Date.now(), content };
    setNotes([...notes, newNote]);
  };

  const editNote = (id: number, newContent: string) => {
    setNotes(notes.map(note => (note.id === id ? { ...note, content: newContent } : note)));
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleReorder = (reorderedNotes: Note[]) => {
    setNotes(reorderedNotes);
  };

  return (
    <div>
      <NoteList notes={notes} onEdit={editNote} onDelete={deleteNote} onReorder={handleReorder} />
      {/* <button onClick={() => addNote('New note content here')}>Add Note</button> */}
    </div>
  );
};

export default IndexPage;
