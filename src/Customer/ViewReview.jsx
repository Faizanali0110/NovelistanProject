import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Cookies } from 'react-cookie';

const ViewsReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cookies = new Cookies();
  
  const customerId = cookies.get('customerId');
  const bookId = cookies.get('bookId');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let url = '/api/reviews/reviewByBookID';
        if (bookId) {
          url += `?id=${bookId}`;
        }
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [bookId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-yellow-50">
        <p className="text-yellow-600">Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-yellow-50">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <h1 className="text-3xl font-bold text-yellow-800 mb-6">Book Reviews</h1>
      
      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card key={review.id} className="border-yellow-200 bg-white hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="bg-yellow-100 px-3 py-1 rounded-full">
                  <span className="text-yellow-800 font-semibold">
                    Review #{review.id}
                  </span>
                </div>
                {review.user.id === customerId && (
                  <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded">
                    Your Review
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mt-3">{review.description}</p>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>Book ID: {review.book.id}</p>
                <p>Reviewer ID: {review.user.id}</p>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {reviews.length === 0 && (
          <div className="text-center p-8 bg-white rounded-lg border border-yellow-200">
            <p className="text-yellow-800">No reviews found for this book.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewsReview;