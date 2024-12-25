// components/DeleteBook.jsx
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Trash2, BookOpen } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8082';

const DeleteBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookImages, setBookImages] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchAuthorBooks();
    return () => {
      Object.values(bookImages).forEach((url) => {
        if (url?.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  const fetchAuthorBooks = async () => {
    try {
      const authorId = Cookies.get('authorId');
      if (!authorId) throw new Error('Author ID not found');

      const response = await fetch(`${API_BASE_URL}/api/book/authorBook/${authorId}`);
      if (!response.ok) throw new Error('Failed to fetch books');

      const data = await response.json();
      setBooks(data);
      data.forEach(book => fetchBookImage(book.id));
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookImage = async (bookId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/book/BookImageBlob/${bookId}`);
      if (!response.ok) throw new Error('Failed to fetch image');

      const contentType = response.headers.get('content-type');
      if (!contentType?.startsWith('image/')) throw new Error('Invalid image type');

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setBookImages(prev => ({ ...prev, [bookId]: imageUrl }));
    } catch (err) {
      console.error(`Image error for book ${bookId}:`, err);
      setBookImages(prev => ({ ...prev, [bookId]: null }));
    }
  };

  const handleDeleteClick = (book) => {
    setSelectedBook(book);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBook?.id) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/book/delete/${selectedBook.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Failed to delete book');

      if (bookImages[selectedBook.id]?.startsWith('blob:')) {
        URL.revokeObjectURL(bookImages[selectedBook.id]);
      }

      setBooks(books.filter(book => book.id !== selectedBook.id));
      setBookImages(prev => {
        const newImages = { ...prev };
        delete newImages[selectedBook.id];
        return newImages;
      });
      setShowConfirmModal(false);
      setSelectedBook(null);
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.message);
    }
  };

  const handleViewPdf = async (bookId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/book/BookPdf/${bookId}`);
      if (!response.ok) throw new Error('Failed to fetch PDF');

      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);
      window.open(pdfUrl, '_blank');
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000);
    } catch (err) {
      console.error('PDF error:', err);
      setError('Failed to open PDF');
    }
  };

  const handleSort = (key) => {
    setSortOrder(sortBy === key && sortOrder === 'asc' ? 'desc' : 'asc');
    setSortBy(key);
  };

  const filteredAndSortedBooks = books
    .filter(book =>
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.toString().includes(searchQuery)
    )
    .sort((a, b) => {
      const factor = sortOrder === 'asc' ? 1 : -1;
      return sortBy === 'name' ? factor * a.name.localeCompare(b.name) :
             sortBy === 'genre' ? factor * a.genre.localeCompare(b.genre) :
             factor * (a[sortBy] - b[sortBy]);
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-yellow-800">Loading books...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-yellow-50">
      <h1 className="text-2xl font-bold mb-4 text-center text-yellow-800">Book Manager</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <input
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-4 border border-yellow-300 rounded-lg"
      />

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => handleSort('name')}
          className={`px-3 py-1 rounded ${sortBy === 'name' ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-800'}`}
        >
          Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button
          onClick={() => handleSort('genre')}
          className={`px-3 py-1 rounded ${sortBy === 'genre' ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-800'}`}
        >
          Genre {sortBy === 'genre' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>

      {!error && filteredAndSortedBooks.length === 0 ? (
        <p className="text-center text-yellow-800">No books found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredAndSortedBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-yellow-200 hover:border-yellow-400 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="relative">
                {bookImages[book.id] ? (
                  <img
                    src={bookImages[book.id]}
                    alt={book.name}
                    className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-48 bg-yellow-50 animate-pulse flex items-center justify-center">
                    <span className="text-yellow-600">Loading...</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h2 className="text-base font-semibold mb-1 text-yellow-800 truncate">{book.name}</h2>
                <p className="text-sm text-yellow-700 mb-1 truncate">Genre: {book.genre}</p>
                <p className="text-sm text-yellow-700 mb-2">ISBN: {book.isbn}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewPdf(book.id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-yellow-500 text-white py-1 px-2 rounded text-sm hover:bg-yellow-600 transition-colors"
                  >
                    <BookOpen className="w-3 h-3" />
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteClick(book)}
                    className="flex-1 flex items-center justify-center gap-1 bg-red-500 text-white py-1 px-2 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-sm w-full mx-4">
            <h2 className="text-lg font-bold mb-2 text-yellow-800">Confirm Delete</h2>
            <p className="mb-4 text-sm text-yellow-700">
              Delete "{selectedBook?.name}"?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setSelectedBook(null);
                }}
                className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;