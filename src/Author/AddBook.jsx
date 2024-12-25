import React, { useState } from 'react';
import Cookies from 'js-cookie';

const AddBook = () => {
  const [book, setBook] = useState({
    name: '',
    isbn: '',
    genre: '',
    author: {
      id: Cookies.get('authorId')
    }
  });
  const [bookFile, setBookFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: name === 'isbn' ? parseInt(value) : value
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'book') {
      setBookFile(file);
    } else {
      setCoverImage(file);
    }
  };

  const validateForm = () => {
    if (!book.name || !book.isbn || !book.genre) {
      setError('Please fill in all fields');
      return false;
    }
    if (!bookFile) {
      setError('Please upload a book file');
      return false;
    }
    if (!coverImage) {
      setError('Please upload a cover image');
      return false;
    }
    if (!book.author.id) {
      setError('Author ID not found. Please log in again');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('book', JSON.stringify({
        name: book.name,
        isbn: book.isbn,
        genre: book.genre,
        author: {
          id: book.author.id
        }
      }));
      formData.append('file', bookFile);
      formData.append('image', coverImage);

      const response = await fetch('http://localhost:8082/api/book/addBook', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Book added successfully!');
        setBook({
          name: '',
          isbn: '',
          genre: '',
          author: {
            id: parseInt(Cookies.get('authorID')) || null
          }
        });
        setBookFile(null);
        setCoverImage(null);
        document.getElementById('bookFile').value = '';
        document.getElementById('coverImage').value = '';
      } else {
        throw new Error(data.message || 'Failed to add book');
      }
    } catch (error) {
      setError(error.message || 'Error adding book. Please try again.');
      console.error('Error details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 p-6">
      <div className="max-w-2xl mx-auto transform hover:scale-[1.01] transition-all duration-300">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden p-8 border border-pink-100">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8 text-center animate-fade-in">
            Add New Book
          </h1>
          
          {error && (
            <div className="p-4 mb-6 rounded-lg bg-red-50 border-l-4 border-red-500 animate-slide-in">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="p-4 mb-6 rounded-lg bg-green-50 border-l-4 border-green-500 animate-slide-in">
              <p className="text-green-700">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="transform hover:scale-[1.02] transition-transform duration-300">
              <label className="block text-gray-700 font-semibold mb-2">
                Book Name
              </label>
              <input
                type="text"
                name="name"
                value={book.name}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-purple-100 rounded-lg focus:outline-none focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-300"
                required
              />
            </div>

            <div className="transform hover:scale-[1.02] transition-transform duration-300">
              <label className="block text-gray-700 font-semibold mb-2">
                ISBN
              </label>
              <input
                type="number"
                name="isbn"
                value={book.isbn}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-purple-100 rounded-lg focus:outline-none focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-300"
                required
              />
            </div>

            <div className="transform hover:scale-[1.02] transition-transform duration-300">
              <label className="block text-gray-700 font-semibold mb-2">
                Genre
              </label>
              <input
                type="text"
                name="genre"
                value={book.genre}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-purple-100 rounded-lg focus:outline-none focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-300"
                required
              />
            </div>

            <div className="transform hover:scale-[1.02] transition-transform duration-300">
              <label className="block text-gray-700 font-semibold mb-2">
                Book File (PDF)
              </label>
              <input
                id="bookFile"
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, 'book')}
                className="w-full p-3 border-2 border-purple-100 rounded-lg focus:outline-none focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                required
              />
            </div>

            <div className="transform hover:scale-[1.02] transition-transform duration-300">
              <label className="block text-gray-700 font-semibold mb-2">
                Cover Image
              </label>
              <input
                id="coverImage"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'image')}
                className="w-full p-3 border-2 border-purple-100 rounded-lg focus:outline-none focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-lg transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="inline-block transform hover:scale-110 transition-transform duration-300">
                {loading ? 'Adding Book...' : 'Add Book'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;