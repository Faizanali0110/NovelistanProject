import React, { useState, useEffect } from 'react';
import { Search, BookOpen, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
  import { Cookies } from 'react-cookie';
const API_BASE_URL = 'http://localhost:8082';

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [groupedBooks, setGroupedBooks] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [imageError, setImageError] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm) handleSearch();
      else fetchBooks();
    }, 300);
    return () => clearTimeout(delaySearch);
  }, [searchTerm, searchType]);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/book/list/allBooks`);
      const data = await response.json();
      setBooks(data);
      groupBooksByGenre(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      let endpoint;
      switch (searchType) {
        case 'genre':
          endpoint = `${API_BASE_URL}/api/book/search/BookByGenre?search=${encodeURIComponent(searchTerm)}`;
          break;
        case 'isbn':
          endpoint = `${API_BASE_URL}/api/book/${searchTerm}`;
          break;
        default:
          endpoint = `${API_BASE_URL}/api/book/search/Book?search=${encodeURIComponent(searchTerm)}`;
      }
      const response = await fetch(endpoint);
      const data = await response.json();
      const booksArray = searchType === 'isbn' ? (data ? [data] : []) : (Array.isArray(data) ? data : []);
      setBooks(booksArray);
      groupBooksByGenre(booksArray);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupBooksByGenre = (booksList) => {
    const grouped = booksList.reduce((acc, book) => {
      if (!acc[book.genre]) acc[book.genre] = [];
      acc[book.genre].push(book);
      return acc;
    }, {});
    setGroupedBooks(grouped);
  };

  const handleImageError = (bookId) => {
    setImageError(prev => ({...prev, [bookId]: true}));
  };

  const viewPdf = async (bookId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/book/BookPdf/${bookId}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      }
    } catch (error) {
      console.error('Error viewing PDF:', error);
    }
  };



const cookies = new Cookies();

const handleReviewClick = (bookId, type) => {
  cookies.set('selectedBookId', bookId, { path: '/' }); // Store the bookId in cookies

  console.log(`Navigating to: ${type === 'add' ? '/add-review' : '/view-reviews'}`);
  if (type === 'add') {
    setTimeout(() => navigate('add-review'), 1000); // Navigate to Add Review
  } else if (type === 'view') {
    setTimeout(() => navigate('view-review'), 1000); // Navigate to View Reviews
  }
};

  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="sticky top-0 z-50 bg-gradient-to-r from-yellow-600 to-yellow-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Search className="h-5 w-5 text-yellow-300" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-32 py-4 rounded-xl bg-yellow-700/50 text-white placeholder-yellow-200"
              placeholder="Search books..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="h-full py-0 pl-4 pr-8 border-transparent bg-transparent text-yellow-200"
              >
                <option value="name">Name</option>
                <option value="isbn">ISBN</option>
                <option value="genre">Genre</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-600"></div>
          </div>
        ) : Object.keys(groupedBooks).length === 0 ? (
          <div className="text-center py-20 text-yellow-800">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl">No books found</p>
          </div>
        ) : (
          Object.entries(groupedBooks).map(([genre, genreBooks]) => (
            <div key={genre} className="mb-12">
              <h2 className="text-3xl font-semibold text-yellow-700 mb-6">{genre}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {genreBooks.map((book) => (
                  <div key={book.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all">
                    <div className="relative h-56">
                      {!imageError[book.id] ? (
                        <img
                          src={`${API_BASE_URL}/api/book/BookImageBlob/${book.id}`}
                          alt={book.name}
                          className="w-full h-full object-cover rounded-t-xl"
                          onError={() => handleImageError(book.id)}
                        />
                      ) : (
                        <div className="w-full h-full bg-yellow-50 flex items-center justify-center rounded-t-xl">
                          <BookOpen className="w-12 h-12 text-yellow-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-yellow-800 mb-2">{book.name}</h3>
                      <p className="text-yellow-600 mb-4">ISBN: {book.isbn}</p>
                      <div className="space-y-2">
                        <button
                          onClick={() => viewPdf(book.id)}
                          className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700"
                        >
                          View PDF
                        </button>
                        <button
                          onClick={() => handleReviewClick(book.id, 'add')}
                          className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
                        >
                          Add Review
                        </button>
                        <button
                          onClick={() => handleReviewClick(book.id, 'view')}
                          className="w-full bg-yellow-400 text-yellow-900 py-2 rounded-lg hover:bg-yellow-500"
                        >
                          View Reviews
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewBooks;