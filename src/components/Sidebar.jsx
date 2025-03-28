import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiFileText, FiSettings, FiLogOut } from 'react-icons/fi';
import { logout } from '../services/authService';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Call logout function from auth service
    logout();
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 shadow-lg">
      <div className="p-4">
        <h2 className="text-xl font-bold text-white">HR Dashboard</h2>
      </div>
      <nav className="mt-8">
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center px-6 py-3 text-gray-100 hover:bg-blue-50 hover:text-blue-600">
              <FiHome className="h-5 w-5 mr-3" />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-6 py-3 text-gray-100 hover:bg-blue-50 hover:text-blue-600">
              <FiUsers className="h-5 w-5 mr-3" />
              <span>Candidates</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-6 py-3 text-gray-100 hover:bg-blue-50 hover:text-blue-600">
              <FiFileText className="h-5 w-5 mr-3" />
              <span>Resumes</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-6 py-3 text-gray-100 hover:bg-blue-50 hover:text-blue-600">
              <FiSettings className="h-5 w-5 mr-3" />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full p-4">
        <button 
          onClick={handleLogout}
          className="flex items-center w-full px-6 py-3 text-gray-100 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
        >
          <FiLogOut className="h-5 w-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 