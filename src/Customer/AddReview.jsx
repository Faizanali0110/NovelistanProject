import React, { useState, useEffect } from 'react';
import { AlertCircle, Loader2, Send, User } from 'lucide-react';
import Cookies from 'js-cookie';
import UserHeader from '../components/UserHeader';
import Footer from '../components/Footer';

const AddReview = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const customerId = Cookies.get('customerId');
  const bookId = Cookies.get('selectedBookId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!customerId) return;

        // Fetch username
        const usernameResponse = await fetch(`http://localhost:8082/api/Customer/UserName/${customerId}`);
        if (usernameResponse.ok) {
          const name = await usernameResponse.text();
          setUsername(name);
        }

        // Fetch user image
        const imageResponse = await fetch(`http://localhost:8082/api/customerImage/${customerId}`);
        if (imageResponse.ok) {
          const blob = await imageResponse.blob();
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, [customerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!bookId || !customerId) {
        throw new Error('Book ID and User ID are required');
      }

      const review = {
        description,
        book: { id: bookId },
        user: { id: customerId }
      };

      const response = await fetch('http://localhost:8082/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review)
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      setSuccess(true);
      setDescription('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UserHeader userImage={imageUrl} userName={username} />
      <div className="min-h-screen bg-yellow-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={username}
                  className="w-16 h-16 rounded-full object-cover border-2 border-yellow-500"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                  <User className="w-8 h-8 text-yellow-600" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{username}</h2>
                <p className="text-gray-600">Writing a review</p>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-yellow-800 mb-6">Add Review</h1>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Review submitted successfully!
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Your Review
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                rows="6"
                required
                placeholder="Write your review here..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Review
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddReview;