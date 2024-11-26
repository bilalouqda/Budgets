import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className="w-64 bg-[#2B3A67] text-white flex flex-col min-h-screen">
      {/* Header with email */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">budget2</span>
          </div>
          <button className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-400 truncate">
          {email}
        </div>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1">
        <div className="p-2 space-y-1">
          <Link
            to="/budget"
            className={`block px-4 py-2 rounded-lg transition-colors ${
              location.pathname === '/budget' 
                ? 'bg-blue-700 text-white' 
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            Budget
          </Link>
          <Link
            to="/reflect"
            className={`block px-4 py-2 rounded-lg transition-colors ${
              location.pathname === '/reflect' 
                ? 'bg-blue-700 text-white' 
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            Reflect
          </Link>
          <Link
            to="/accounts"
            className={`block px-4 py-2 rounded-lg transition-colors ${
              location.pathname === '/accounts' 
                ? 'bg-blue-700 text-white' 
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            All Accounts
          </Link>
        </div>

        {/* No Accounts Warning */}
        <div className="p-4 mt-4 mx-2">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="font-medium text-white">No Accounts</h3>
            <p className="text-sm text-gray-300 mt-1">
              You can't budget without adding accounts to YNAB first.
            </p>
            <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
              Add Account
            </button>
          </div>
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
