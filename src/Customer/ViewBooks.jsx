import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Star, ChevronLeft } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8082';

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [groupedBooks, setGroupedBooks] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [imageError, setImageError] = useState({});

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm) {
        handleSearch();
      } else {
        fetchBooks();
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchTerm, searchType]);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/book/list/allBooks`);
      const data = await response.json();
      setBooks(data);
      groupBooksByGenre(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
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
          break;
      }

      const response = await fetch(endpoint);
      const data = await response.json();
      
      const booksArray = searchType === 'isbn' ? (data ? [data] : []) : (Array.isArray(data) ? data : []);
      setBooks(booksArray);
      groupBooksByGenre(booksArray);
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupBooksByGenre = (booksList) => {
    const grouped = booksList.reduce((acc, book) => {
      if (!acc[book.genre]) {
        acc[book.genre] = [];
      }
      acc[book.genre].push(book);
      return acc;
    }, {});
    setGroupedBooks(grouped);
  };

  const handleImageError = (bookId) => {
    setImageError(prev => ({
      ...prev,
      [bookId]: true
    }));
  };

  const openBookDetails = async (book) => {
    setSelectedBook(book);
    try {
      const response = await fetch(`${API_BASE_URL}/api/reviews/reviewByBookID?id=${book.id}`);
      if (response.ok) {
        const reviewData = await response.json();
        setReviews(reviewData);
      } else if (response.status === 204) {
        setReviews([]); // No reviews yet
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) {
        alert("Please log in to submit a review");
        return;
      }

      const reviewData = {
        description: newReview.comment,
        book: { id: selectedBook.id },
        user: { id: currentUser.id }
      };

      const response = await fetch(`${API_BASE_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData)
      });

      if (response.ok) {
        // Clear form
        setNewReview({ rating: 5, comment: '' });
        
        // Refresh reviews
        const updatedReviewsResponse = await fetch(`${API_BASE_URL}/api/reviews/reviewByBookID?id=${selectedBook.id}`);
        if (updatedReviewsResponse.ok) {
          const updatedReviews = await updatedReviewsResponse.json();
          setReviews(updatedReviews);
        }
      } else {
        alert('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review');
    }
    console.log(selectedBook.id)
  };

  const StarRating = ({ rating }) => (
    <div className="flex text-yellow-500">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${index < rating ? 'fill-yellow-500' : 'fill-none'}`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="sticky top-0 z-50 bg-gradient-to-r from-yellow-600 to-yellow-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-yellow-300" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-32 py-4 rounded-xl bg-yellow-700/50 text-white placeholder-yellow-200 border-2 border-yellow-500/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
              placeholder="Search for your next adventure..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="h-full py-0 pl-4 pr-8 border-transparent bg-transparent text-yellow-200 font-medium focus:ring-0 cursor-pointer"
              >
                <option value="name" className="text-gray-900">Name</option>
                <option value="isbn" className="text-gray-900">ISBN</option>
                <option value="genre" className="text-gray-900">Genre</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!selectedBook ? (
          <div className="space-y-12">
            <h1 className="text-4xl font-bold text-yellow-800 border-b-4 border-yellow-500 pb-4 inline-block">
              Book Collection
            </h1>
            
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-600"></div>
              </div>
            ) : Object.keys(groupedBooks).length === 0 ? (
              <div className="text-center py-20 text-yellow-800">
                <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl">No books found</p>
              </div>
            ) : (
              Object.entries(groupedBooks).map(([genre, genreBooks]) => (
                <div key={genre} className="space-y-6">
                  <h2 className="text-3xl font-semibold text-yellow-700">{genre}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {genreBooks.map((book) => (
                      <div
                        key={book.id}
                        onClick={() => openBookDetails(book)}
                        className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                      >
                        {!imageError[book.id] ? (
                          <img
                            src={`${API_BASE_URL}/api/book/BookImageBlob/${book.id}`}
                            alt={book.name}
                            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={() => handleImageError(book.id)}
                          />
                        ) : (
                          <div className="w-full h-56 bg-yellow-50 flex items-center justify-center">
                            <BookOpen className="w-12 h-12 text-yellow-300" />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-yellow-800 mb-2 group-hover:text-yellow-600">
                            {book.name}
                          </h3>
                          <p className="text-yellow-600 opacity-75">ISBN: {book.isbn}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-xl p-8">
            <button
              onClick={() => setSelectedBook(null)}
              className="flex items-center text-yellow-600 hover:text-yellow-800 mb-8 group"
            >
              <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Books
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                {!imageError[selectedBook.id] ? (
                  <img
                    src={`${API_BASE_URL}/api/book/BookImageBlob/${selectedBook.id}`}
                    alt={selectedBook.name}
                    className="w-full rounded-xl shadow-lg"
                    onError={() => handleImageError(selectedBook.id)}
                  />
                ) : (
                  <div className="w-full h-96 bg-yellow-50 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-20 h-20 text-yellow-300" />
                  </div>
                )}
                
                <button
                  onClick={() => viewPdf(selectedBook.id)}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-white py-3 rounded-xl hover:from-yellow-700 hover:to-yellow-800 transition-colors duration-300 font-medium"
                >
                  View PDF
                </button>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-yellow-800 mb-4">{selectedBook.name}</h2>
                  <p className="text-yellow-600">Genre: {selectedBook.genre}</p>
                  <p className="text-yellow-600">ISBN: {selectedBook.isbn}</p>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-yellow-700">Reviews</h3>
                  
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label className="block text-yellow-700 mb-2">Rating</label>
                      <select
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                        className="w-full border-2 border-yellow-200 rounded-lg px-4 py-2 focus:border-yellow-400 focus:ring-yellow-400"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>{num} Stars</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-yellow-700 mb-2">Your Review</label>
                      <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        className="w-full border-2 border-yellow-200 rounded-lg px-4 py-2 h-32 focus:border-yellow-400 focus:ring-yellow-400"
                        placeholder="Share your thoughts about this book..."
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-white py-3 rounded-xl hover:from-yellow-700 hover:to-yellow-800 transition-colors duration-300 font-medium"
                    >
                      Submit Review
                    </button>
                  </form>

                  <div className="space-y-4">
                    {reviews.length === 0 ? (
                      <p className="text-yellow-600 text-center py-4">No reviews yet. Be the first to review!</p>
                    ) : (
                      reviews.map((review) => (
                        <div key={review.id} className="border-l-4 border-yellow-400 pl-4 py-2">
                          <div className="flex items-center justify-between mb-2">
                            <StarRating rating={review.rating || 5} />
                            <span className="text-yellow-600 font-medium">
                              {review.user?.username || 'Anonymous'}
                            </span>
                          </div>
                          <p className="text-gray-700">{review.description}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBooks;