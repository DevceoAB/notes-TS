import React, { useState } from 'react';
import axios from 'axios';

interface CreateNoteModalProps {
  onClose: () => void;
  onSave: () => void;
}

const CreateNoteModal: React.FC<CreateNoteModalProps> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = async () => {
    await axios.post('https://improved-journey-4jgwj9p9x55637wgw-5000.app.github.dev/api/notes', { title, description });
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create Note</h2>
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
        </div>
      </div>
    </div>
  );
};

export default CreateNoteModal;
