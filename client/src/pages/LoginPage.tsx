// src/pages/LoginPage.tsx
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const LoginPage: React.FC = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://improved-journey-4jgwj9p9x55637wgw-5000.app.github.dev/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/profile');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className="bg-white dark:bg-gray-700 p-8 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
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
        <button onClick={handleLogin} className="bg-blue-500 text-white p-2 w-full">Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
