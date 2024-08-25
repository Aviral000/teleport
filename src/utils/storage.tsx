export const getNotesFromStorage = () => {
    const storedNotes = localStorage.getItem('notes');
    return storedNotes ? JSON.parse(storedNotes) : [];
};

export const saveNotesToStorage = (notes: any) => {
    localStorage.setItem('notes', JSON.stringify(notes));
};