import React from 'react';
import '../../styles/NoteItem.module.scss';

interface NotesItemProps {
  note: { id: number; content: string };
  onEdit: (id: number, newContent: string) => void;
  onDelete: (id: number) => void;
}

const NotesItem: React.FC<NotesItemProps> = ({ note, onEdit, onDelete }) => {
  const handleEdit = () => {
    // You might want to implement a more sophisticated edit functionality
    // that preserves formatting
    const newContent = prompt('Edit note content:', note.content);
    if (newContent !== null) {
      onEdit(note.id, newContent);
    }
  };

  const getBackgroundColor = () => {
    if (note.content.includes('#important')) {
      return 'red';
    }
    if (note.content.includes('#todo')) {
      return 'grey';
    }
    return 'white';
  };

  return (
    <div
      className='noteItem'
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div dangerouslySetInnerHTML={{ __html: note.content }} />
      <button onClick={handleEdit}>Edit</button>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
};

export default NotesItem;