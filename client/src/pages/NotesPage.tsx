import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import axios from 'axios';
import CreateNoteModal from '../components/CreateNoteModal';
import EditNoteModal from '../components/EditNoteModal';

interface Note {
  _id: string;
  title: string;
  description: string;
}

const NotesPage: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await axios.get('https://improved-journey-4jgwj9p9x55637wgw-5000.app.github.dev/api/notes');
      setNotes(response.data);
    };
    fetchNotes();
  }, []);

  const handleReadNote = (note: Note) => {
    setSelectedNote(note);
    setShowEditModal(true);
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen`}>
      <h1 className="text-3xl font-bold text-center my-4">Your Notes</h1>
      <div className="grid grid-cols-3 gap-4 p-4">
        {notes.map((note) => (
          <div key={note._id} className={`p-4 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-bold">{note.title}</h2>
            <p>{note.description}</p>
            <button
              onClick={() => handleReadNote(note)}
              className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
            >
              Read
            </button>
          </div>
        ))}
      </div>
      <CreateNoteModal onClose={() => {}} onSave={() => {}} />
      {showEditModal && selectedNote && <EditNoteModal note={selectedNote} onClose={() => setShowEditModal(false)} />}
    </div>
  );
};

export default NotesPage;
