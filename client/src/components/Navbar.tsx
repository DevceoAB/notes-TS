// src/components/Navbar.tsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <div className="text-xl">ABC</div>
      <div className="flex items-center">
        <button onClick={toggleTheme} className="mr-4">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button onClick={handleLogin} className="mr-4">Login</button>
        <button onClick={handleSignup}>Signup</button>
      </div>
    </nav>
  );
};

export default Navbar;
