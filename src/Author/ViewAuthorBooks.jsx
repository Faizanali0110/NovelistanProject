import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const ViewAuthorBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const authorId = Cookies.get('authorId');
        
        if (!authorId) {
          throw new Error('Author ID not found');
        }
  
        const response = await fetch(`http://localhost:8082/api/book/authorBook/${authorId}`);
        
        if (!response.ok) {
          const errorText = await response.text(); // Read response body as text
          throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }
  
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError(error.message || 'Failed to load books. Please try again later.');
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBooks();
  }, []);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Books</h1>
      
      {books.length === 0 ? (
        <div className="text-center text-gray-500">
          No books found. Start by adding some books!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div 
              key={book.isbn}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={`http://localhost:8082/api/book/BookImageBlob/${book.id}`} 
                  alt={book.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder-book.png';
                  }}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {book.name}
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">ISBN:</span> {book.isbn}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Genre:</span> {book.genre}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAuthorBooks;
