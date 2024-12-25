import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Edit2, BookOpen } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8082';

const UpdateBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookImages, setBookImages] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    isbn: '',
    genre: '',
  });
  const [newImage, setNewImage] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchAuthorBooks();

    return () => {
      Object.values(bookImages).forEach((url) => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
      if (previewImage && previewImage.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, []);

  const fetchAuthorBooks = async () => {
    try {
      const authorId = Cookies.get('authorId');
      if (!authorId) {
        throw new Error('Author ID not found in cookies');
      }

      const response = await fetch(`${API_BASE_URL}/api/book/authorBook/${authorId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const data = await response.json();
      setBooks(data);

      data.forEach((book) => {
        fetchBookImage(book.id);
      });
    } catch (err) {
      console.error('Error fetching books:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookImage = async (bookId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/book/BookImageBlob/${bookId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.startsWith('image/')) {
        throw new Error('Invalid image content type');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      setBookImages((prev) => ({
        ...prev,
        [bookId]: imageUrl,
      }));
    } catch (err) {
      console.error(`Error fetching image for book ${bookId}:`, err);
      setBookImages((prev) => ({
        ...prev,
        [bookId]: null,
      }));
    }
  };

  const handleUpdateClick = (book) => {
    setSelectedBook(book);
    setUpdateFormData({
      name: book.name,
      isbn: book.isbn,
      genre: book.genre,
    });
    setShowUpdateModal(true);
    setError(null);
    setSuccess('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateFiles = () => {
    if (newImage && !newImage.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return false;
    }

    if (newFile && newFile.type !== 'application/pdf') {
      setError('Please select a valid PDF file');
      return false;
    }

    const maxSize = 5 * 1024 * 1024;
    if (newImage && newImage.size > maxSize) {
      setError('Image file size should be less than 5MB');
      return false;
    }

    if (newFile && newFile.size > maxSize) {
      setError('PDF file size should be less than 5MB');
      return false;
    }

    return true;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      const imageUrl = URL.createObjectURL(file);
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
      setPreviewImage(imageUrl);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFile(file);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (!selectedBook || isSubmitting) return;

    if (!validateFiles()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess('');

    try {
      const formData = new FormData();
      const bookData = {
        ...updateFormData,
        author: selectedBook.author,
      };
      
      formData.append('book', JSON.stringify(bookData));
      
      if (newImage) {
        formData.append('image', newImage);
      }
      
      if (newFile) {
        formData.append('file', newFile);
      }

      const response = await fetch(`${API_BASE_URL}/api/book/update/${selectedBook.id}`, {
        method: 'PUT',
        body: formData,
      });

      const responseData = await response.text();
      let parsedData;
      try {
        parsedData = JSON.parse(responseData);
      } catch (e) {
        parsedData = responseData;
      }

      if (!response.ok) {
        throw new Error(typeof parsedData === 'string' ? parsedData : 'Failed to update book');
      }

      setBooks(books.map((book) => 
        book.id === selectedBook.id ? parsedData : book
      ));
      
      if (bookImages[selectedBook.id]?.startsWith('blob:')) {
        URL.revokeObjectURL(bookImages[selectedBook.id]);
      }
      
      await fetchBookImage(selectedBook.id);
      
      setSuccess('Book updated successfully!');
      
      setTimeout(() => {
        setShowUpdateModal(false);
        setSelectedBook(null);
        setNewImage(null);
        setNewFile(null);
        setPreviewImage(null);
        setSuccess('');
      }, 1500);

    } catch (err) {
      console.error('Error updating book:', err);
      setError(err.message || 'Failed to update book');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewPdf = async (bookId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/book/BookPdf/${bookId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }

      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);
      window.open(pdfUrl, '_blank');

      setTimeout(() => {
        URL.revokeObjectURL(pdfUrl);
      }, 1000);
    } catch (err) {
      console.error('Error fetching PDF:', err);
      setError('Failed to open PDF');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg animate-pulse">Loading books...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Update Books
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 animate-fadeIn">
          {error}
        </div>
      )}

      <div className="mb-8 transform transition-all duration-300 hover:scale-102">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books
          .filter(book =>
            book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.isbn.toString().includes(searchQuery)
          )
          .map((book) => (
            <div
              key={book.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="aspect-square relative overflow-hidden">
                {bookImages[book.id] ? (
                  <img
                    src={bookImages[book.id]}
                    alt={book.name}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center animate-pulse">
                    <span className="text-gray-400">Loading image...</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {book.name}
                </h2>
                <p className="text-gray-600 mb-2 transition-colors duration-300">
                  <span className="font-medium">Genre:</span> {book.genre}
                </p>
                <p className="text-gray-600 mb-4 transition-colors duration-300">
                  <span className="font-medium">ISBN:</span> {book.isbn}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleViewPdf(book.id)}
                    className="flex items-center justify-center gap-2 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <BookOpen className="w-5 h-5" />
                    View PDF
                  </button>
                  <button
                    onClick={() => handleUpdateClick(book)}
                    className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Edit2 className="w-5 h-5" />
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 transform transition-all duration-300">
            <h2 className="text-2xl font-bold mb-6">Update Book</h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 animate-fadeIn">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 animate-fadeIn">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmitUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={updateFormData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">ISBN</label>
                <input
                  type="number"
                  name="isbn"
                  value={updateFormData.isbn}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Genre</label>
                <input
                  type="text"
                  name="genre"
                  value={updateFormData.genre}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">New Cover Image (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="mt-3 w-full h-48 object-cover rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                  />
                )}
              </div>
              {/* Previous code remains exactly the same until the PDF file input label... */}

              <div>
                <label className="block text-sm font-medium mb-2">New PDF File (optional)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setShowUpdateModal(false);
                    setSelectedBook(null);
                    setNewImage(null);
                    setNewFile(null);
                    setPreviewImage(null);
                    setError('');
                    setSuccess('');
                  }}
                  className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Updating...' : 'Update Book'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateBook;