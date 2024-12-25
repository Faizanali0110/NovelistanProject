// LoginPage.jsx
import React, { useState } from 'react';
import { LogIn, User, Lock, BookOpen, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

// SVG Components
const LoginSVG = () => (
  <svg viewBox="0 0 500 500" className="w-full h-auto">
    <path d="M333.3,213.3c0,29.1-23.6,52.7-52.7,52.7s-52.7-23.6-52.7-52.7s23.6-52.7,52.7-52.7S333.3,184.2,333.3,213.3z" fill="#4B5563"/>
    <circle cx="280.6" cy="213.3" r="39.5" fill="#E5E7EB"/>
    <path d="M280.6,292.7c-43.6,0-79,35.4-79,79v26.3h158v-26.3C359.6,328.1,324.2,292.7,280.6,292.7z" fill="#4B5563"/>
    <path d="M359.6,371.7v26.3h39.5v-26.3c0-43.6-35.4-79-79-79h-39.5C324.2,292.7,359.6,328.1,359.6,371.7z" fill="#374151"/>
  </svg>
);

const FlyingPersonSVG = () => (
  <svg viewBox="0 0 200 200" className="absolute -top-16 -right-16 w-32 h-32">
    <path d="M100,20c-44.1,0-80,35.9-80,80s35.9,80,80,80s80-35.9,80-80S144.1,20,100,20z" fill="#dbeafe"/>
    <path d="M100,50c-16.5,0-30,13.5-30,30s13.5,30,30,30s30-13.5,30-30S116.5,50,100,50z" fill="#3b82f6"/>
    <path d="M100,120c-24.8,0-45,20.2-45,45v15h90v-15C145,140.2,124.8,120,100,120z" fill="#3b82f6"/>
  </svg>
);

const SocialIcon = ({ platform }) => {
  const icons = {
    google: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4"/>
      </svg>
    ),
    facebook: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" fill="#1DA1F2"/>
      </svg>
    ),
  };

  return icons[platform] || null;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!selectedRole) {
      setError('Please select a role first');
      return;
    }

    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const params = new URLSearchParams({
        email: formData.email,
        password: formData.password,
      });

      let response;
      if (selectedRole === 'author') {
        response = await axios.post(`http://localhost:8082/api/authors/login?${params}`);
        if (response.data) {
          Cookies.set('authorId', response.data, { expires: 7 });
          setSuccess(true);
          setTimeout(() => navigate('/AuthorHandling'), 1500);
        }
      } else if (selectedRole === 'customer') {
        response = await axios.post(`http://localhost:8082/api/userLogin?${params}`);
        if (response.data) {
          Cookies.set('customerId', response.data, { expires: 7 });
          setSuccess(true);
          setTimeout(() => navigate('/CustomerHandling'), 1500);
        }
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError(error.response?.data || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6e4] flex items-center justify-center p-4">
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <div className="w-32">
          <LoginSVG />
        </div>
      </div>

      <div className="w-full max-w-6xl flex items-center">
        {/* Left side with login illustration */}
        <div className="hidden lg:block w-1/3">
          <LoginSVG />
        </div>

        {/* Right side with form */}
        <div className="flex-1 lg:pl-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 relative max-w-md mx-auto">
            <div className="relative z-10">
              <FlyingPersonSVG />

              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
                <p className="text-gray-600 text-sm mt-2">Login to continue</p>
              </div>

              {/* Role Selection */}
              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={() => setSelectedRole('customer')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    selectedRole === 'customer'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Customer</span>
                </button>
                <button
                  onClick={() => setSelectedRole('author')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    selectedRole === 'author'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Author</span>
                </button>
              </div>

              {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-2 bg-green-100 text-green-700 rounded-lg text-sm text-center">
                  Login successful! Redirecting...
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Username"
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                    required
                  />
                  <User className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                </div>

                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                    required
                  />
                  <Lock className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                </div>

                <div className="flex justify-between items-center text-sm">
                  <a href="#" className="text-gray-600 hover:text-blue-500">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 rounded-lg transition-all ${
                    !selectedRole
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                  disabled={!selectedRole || loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>

                <div className="text-center mt-4">
                  <Link to="/signup" className="text-blue-500 hover:underline text-sm">
                    New user? Sign Up
                  </Link>
                </div>

                {/* Social Login */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center gap-4">
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all">
                      <SocialIcon platform="google" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all">
                      <SocialIcon platform="facebook" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all">
                      <SocialIcon platform="twitter" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;