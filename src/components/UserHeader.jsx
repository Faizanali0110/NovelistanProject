import React from 'react';

const UserHeader = ({ userImage, userName }) => {
  return (
    <header className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-md py-4 px-6 flex items-center justify-between">
      {/* Left Section: Logo/Title */}
      <div className="flex items-center">
        <img 
          src={userImage} 
          alt="User Profile" 
          className="w-12 h-12 rounded-full border-2 border-white shadow-lg" 
        />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">Novelistan</h1>
          <p className="text-sm text-yellow-200">Welcome, {userName}!</p>
        </div>
      </div>

      {/* Right Section: Navigation or Extra Info */}
      <div className="flex items-center gap-4">
        <button 
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-700 transition duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default UserHeader;
