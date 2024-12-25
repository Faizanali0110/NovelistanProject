import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Home, User, Book, Mail, LogIn, UserPlus } from 'lucide-react';

// Landing Page Component
const NovelLandingPage = () => {
  return (
    <div className="min-h-screen bg-yellow-50 font-sans">
      {/* Navigation Bar */}
      <nav className="bg-yellow-500 text-black p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-black" />
            <h1 className="text-2xl font-bold">Novelistan</h1>
          </div>
          <div className="flex space-x-6 items-center">
            <Link to="/" className="flex items-center space-x-1 hover:text-yellow-800">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-1 hover:text-yellow-800">
              <User className="h-5 w-5" />
              <span>About</span>
            </Link>
            <Link to="/contact" className="flex items-center space-x-1 hover:text-yellow-800">
              <Mail className="h-5 w-5" />
              <span>Contact</span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link 
              to="/login" 
              className="bg-black text-yellow-500 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-yellow-800 transition"
            >
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Link>
            <Link 
              to="/signup" 
              className="bg-black text-yellow-500 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-yellow-800 transition"
            >
              <UserPlus className="h-5 w-5" />
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Rest of the Landing Page content remains the same */}
      <header className="container mx-auto mt-16 text-center">
        <h2 className="text-5xl font-bold text-black mb-6">Welcome to Novelistan</h2>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
          Discover, Create, and Share Your Stories. Novelistan is your ultimate platform for writers and readers.
        </p>
        <div className="space-x-4">
          <button className="bg-black text-yellow-500 px-6 py-3 rounded-lg hover:bg-yellow-800 transition">
            Start Writing
          </button>
          <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-600 transition">
            Browse Stories
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto mt-16 grid md:grid-cols-3 gap-8">
        <div className="bg-yellow-100 p-6 rounded-lg text-center shadow-md">
          <Book className="mx-auto h-12 w-12 text-black mb-4" />
          <h3 className="text-xl font-bold mb-2">Create Novels</h3>
          <p>Write and publish your novels easily with our intuitive writing tools.</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg text-center shadow-md">
          <User className="mx-auto h-12 w-12 text-black mb-4" />
          <h3 className="text-xl font-bold mb-2">Community</h3>
          <p>Connect with fellow writers and readers from around the world.</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg text-center shadow-md">
          <Mail className="mx-auto h-12 w-12 text-black mb-4" />
          <h3 className="text-xl font-bold mb-2">Feedback</h3>
          <p>Get constructive feedback and improve your writing skills.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-yellow-500 text-black py-8 mt-16">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Novelistan. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};
export default NovelLandingPage;