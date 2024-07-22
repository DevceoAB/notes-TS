// src/pages/SignupPage.tsx
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const SignupPage: React.FC = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post('https://improved-journey-4jgwj9p9x55637wgw-5000.app.github.dev/api/auth/signup', { username, email, password });
      navigate('/profile');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className="bg-white dark:bg-gray-700 p-8 rounded shadow-md">
        <h2 className="text-2xl mb-4">Signup</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-4 w-full dark:bg-gray-800 dark:text-white"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full dark:bg-gray-800 dark:text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full dark:bg-gray-800 dark:text-white"
        />
        <button onClick={handleSignup} className="bg-blue-500 text-white p-2 w-full">Signup</button>
      </div>
    </div>
  );
};

export default SignupPage;
