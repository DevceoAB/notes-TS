import React, { useState } from 'react';
import axios from 'axios';

interface Note {
  _id: string;
  title: string;
  description: string;
}

interface EditNoteModalProps {
  note: Note;
  onClose: () => void;
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({ note, onClose }) => {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);

  const handleSave = async () => {
    await axios.put(`https://improved-journey-4jgwj9p9x55637wgw-5000.app.github.dev/api/notes/${note._id}`, { title, description });
    onClose();
  };

  const handleDelete = async () => {
    await axios.delete(`/api/notes/${note._id}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Note</h2>
        <input
          className="border p-2 w-full mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="border p-2 w-full mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded-lg">Cancel</button>
          <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded-lg">Save</button>
          <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded-lg">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;
