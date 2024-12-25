import React, { useState } from 'react';
import { UserPlus, BookOpen, ShoppingCart, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SuccessCard = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 shadow-xl max-w-sm w-full mx-4">
      <div className="text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{message}</h3>
        <p className="text-gray-500 mb-6">You will be redirected to login page shortly.</p>
        <button
          onClick={onClose}
          className="bg-black text-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-800 transition"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
);

const SignupPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    secretCode: '', // for customer
    securityCode: '', // for author
    name: '', // for author
    dateOfBirth: '' // for author
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (selectedRole === 'customer') {
        const formDataObj = new FormData();
        const userJson = JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          secretCode: formData.secretCode
        });
        formDataObj.append('user', userJson);
        formDataObj.append('image', file);

        const response = await axios.post('http://localhost:8082/addUser', formDataObj, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data) {
          setShowSuccess(true);
          // Optional: Auto-navigate after 3 seconds
          setTimeout(() => {
            handleSuccessClose();
          }, 3000);
        }
      } else {
        // Author registration
        const authorData = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          name: formData.name,
          dateOfBirth: formData.dateOfBirth,
          securityCode: formData.securityCode
        };

        const response = await axios.post('http://localhost:8082/api/authors/addAuthor', authorData);

        if (response.data) {
          setShowSuccess(true);
          // Optional: Auto-navigate after 3 seconds
          setTimeout(() => {
            handleSuccessClose();
          }, 3000);
        }
      }
    } catch (error) {
      setError(error.response?.data || 'Registration failed. Please try again.');
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-4">
      <div className="bg-yellow-100 p-8 rounded-lg shadow-lg w-96">
        <div className="text-center mb-6">
          <UserPlus className="mx-auto h-12 w-12 text-black mb-4" />
          <h2 className="text-3xl font-bold text-black">Sign Up</h2>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="mb-6 flex justify-center space-x-4">
          <button 
            onClick={() => setSelectedRole('customer')}
            className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all 
              ${selectedRole === 'customer' 
                ? 'bg-black text-yellow-500 border-black' 
                : 'bg-yellow-50 text-black border-yellow-500 hover:bg-yellow-200'}`}
          >
            <ShoppingCart className="h-8 w-8 mb-2" />
            <span>Customer</span>
          </button>
          <button 
            onClick={() => setSelectedRole('author')}
            className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all 
              ${selectedRole === 'author' 
                ? 'bg-black text-yellow-500 border-black' 
                : 'bg-yellow-50 text-black border-yellow-500 hover:bg-yellow-200'}`}
          >
            <BookOpen className="h-8 w-8 mb-2" />
            <span>Author</span>
          </button>
        </div>

        <form onSubmit={handleSignup}>
          {/* Common Fields */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-black mb-2">Username</label>
            <input 
              type="text" 
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-yellow-500 rounded-lg"
              required 
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-black mb-2">Email</label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-yellow-500 rounded-lg"
              required 
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-black mb-2">Password</label>
            <input 
              type="password" 
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-yellow-500 rounded-lg"
              required 
            />
          </div>

          {/* Customer-specific fields */}
          {selectedRole === 'customer' && (
            <>
              <div className="mb-4">
                <label htmlFor="secretCode" className="block text-black mb-2">Secret Code</label>
                <input 
                  type="text" 
                  id="secretCode"
                  name="secretCode"
                  value={formData.secretCode}
                  onChange={handleChange}
                  className="w-full p-2 border border-yellow-500 rounded-lg"
                  required 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-black mb-2">Profile Image</label>
                <input 
                  type="file" 
                  id="image"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-yellow-500 rounded-lg"
                  accept="image/*"
                  required 
                />
              </div>
            </>
          )}

          {/* Author-specific fields */}
          {selectedRole === 'author' && (
            <>
              <div className="mb-4">
                <label htmlFor="name" className="block text-black mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-yellow-500 rounded-lg"
                  required 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="dateOfBirth" className="block text-black mb-2">Date of Birth</label>
                <input 
                  type="date" 
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full p-2 border border-yellow-500 rounded-lg"
                  required 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="securityCode" className="block text-black mb-2">Security Code</label>
                <input 
                  type="text" 
                  id="securityCode"
                  name="securityCode"
                  value={formData.securityCode}
                  onChange={handleChange}
                  className="w-full p-2 border border-yellow-500 rounded-lg"
                  required 
                />
              </div>
            </>
          )}

          <button 
            type="submit" 
            className="w-full bg-black text-yellow-500 py-2 rounded-lg hover:bg-yellow-800 transition"
            disabled={!selectedRole}
          >
            Sign Up
          </button>

          <div className="text-center mt-4">
            <Link to="/login" className="text-black hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </form>

        {showSuccess && (
          <SuccessCard
            message={`Successfully registered as ${selectedRole}!`}
            onClose={handleSuccessClose}
          />
        )}
      </div>
    </div>
  );
};

export default SignupPage;