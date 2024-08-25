import React from 'react';
import NotesItem from './NotesItem';
import '../../styles/NotesList.module.scss';

interface Note {
  id: number;
  content: string;
}

interface NoteListProps {
  notes: Note[];
  onEdit: (id: number, newContent: string) => void;
  onDelete: (id: number) => void;
  onReorder: (reorderedNotes: Note[]) => void;
  selectedCategory: string;
  searchTerm: string
}

const NoteList: React.FC<NoteListProps> = ({ notes, onEdit, onDelete, onReorder, selectedCategory, searchTerm }) => {

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData('noteIndex', index.toString());
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData('noteIndex'), 10);
    const reorderedNotes = [...notes];
    const [draggedNote] = reorderedNotes.splice(draggedIndex, 1);
    reorderedNotes.splice(index, 0, draggedNote);
    onReorder(reorderedNotes);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const filteredNotes = notes.filter(note => {
    const matchesCategory = selectedCategory === 'All' ||
      (selectedCategory === 'Important' && note.content.includes('#important')) ||
      (selectedCategory === 'Todo' && note.content.includes('#todo'));

    const matchesSearchTerm = note.content.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearchTerm;
  });

  return (
    <div className='noteList'>
      {filteredNotes.map((note, index) => (
        <div
          key={note.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          className='noteItem'
        >
          <NotesItem note={note} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
};

export default NoteList;
