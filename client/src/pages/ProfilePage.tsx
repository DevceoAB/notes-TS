// src/pages/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateNoteModal from '../components/CreateNoteModal';
import ImageUpload from '../components/ImageUpload';
import { useNavigate } from 'react-router-dom';

interface Note {
  _id: string;
  title: string;
  description: string;
}

const ProfilePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const [profileImage, setProfileImage] = useState<string>(''); // state to hold the profile image URL
  const [username, setUsername] = useState<string>(''); // state to hold the username
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchNotes();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      const response = await axios.get('https://improved-journey-4jgwj9p9x55637wgw-5000.app.github.dev/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching profile:', error);
      navigate('/login');
    }
  };

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      const response = await axios.get('https://improved-journey-4jgwj9p9x55637wgw-5000.app.github.dev/api/notes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      navigate('/login');
    }
  };

  const handleNoteSave = async (title: string, description: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://improved-journey-4jgwj9p9x55637wgw-5000.app.github.dev/api/notes',
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchNotes(); // Refresh notes list
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleImageUpload = (url: string) => {
    setProfileImage(url);
    // Optionally save the profile image URL to the database
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Welcome, {username}</h1>
        <div>
          <button onClick={() => setShowModal(true)} className="bg-green-500 text-white p-2 mr-2">Create Note</button>
          <button onClick={handleLogout} className="bg-red-500 text-white p-2">Logout</button>
        </div>
      </div>
      <div className="flex justify-center items-center mb-4">
        <img src={profileImage || 'default_profile_image_url'} alt="Profile" className="rounded-full h-32 w-32" />
        <ImageUpload onUpload={handleImageUpload} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {notes.map((note:Note) => (
          <div key={note._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">{note.title}</h2>
            <p>{note.description}</p>
            <button className="bg-blue-500 text-white p-2 mt-2">Read</button>
          </div>
        ))}
      </div>
      {showModal && <CreateNoteModal onClose={() => setShowModal(false)} onSave={handleNoteSave} />}
    </div>
  );
};

export default ProfilePage;
