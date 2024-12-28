import React, { useState, useEffect } from 'react';
import { AlertCircle, Loader2, Star, User } from 'lucide-react';
import Cookies from 'js-cookie';
import UserHeader from '../components/UserHeader';
import Footer from '../components/Footer';

const ViewReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [currentUser, setCurrentUser] = useState({
    userImage: '',
    userName: ''
  });

  const customerId = Cookies.get('customerId');
  const bookId = Cookies.get('selectedBookId');

  const fetchUserInfo = async (userId) => {
    try {
      // Fetch username
      const usernameResponse = await fetch(`http://localhost:8082/api/Customer/UserName/${userId}`);
      let username = '';
      if (usernameResponse.ok) {
        username = await usernameResponse.text();
      }

      // Fetch user image
      const imageResponse = await fetch(`http://localhost:8082/api/customerImage/${userId}`);
      let imageUrl = '';
      if (imageResponse.ok) {
        const blob = await imageResponse.blob();
        imageUrl = URL.createObjectURL(blob);
      }

      return { username, imageUrl };
    } catch (err) {
      console.error('Error fetching user info:', err);
      return { username: '', imageUrl: '' };
    }
  };

  // New useEffect for fetching current user's info
  useEffect(() => {
    const fetchCurrentUserInfo = async () => {
      if (customerId) {
        const userInfo = await fetchUserInfo(customerId);
        setCurrentUser({
          userImage: userInfo.imageUrl,
          userName: userInfo.username
        });
      }
    };

    fetchCurrentUserInfo();
  }, [customerId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!bookId) {
          throw new Error('Book ID is required');
        }

        const response = await fetch(`http://localhost:8082/api/reviews/reviewByBookID/${bookId}`);

        if (!response.ok) {
          if (response.status === 204) {
            setReviews([]);
            return;
          }
          throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();
        
        // Fetch user info for each review
        const userInfoPromises = data.map(review => 
          fetchUserInfo(review.user.id).then(info => ({
            userId: review.user.id,
            ...info
          }))
        );
        
        const userInfoResults = await Promise.all(userInfoPromises);
        const userInfoMap = {};
        userInfoResults.forEach(info => {
          userInfoMap[info.userId] = {
            username: info.username,
            imageUrl: info.imageUrl
          };
        });
        
        setUserInfo(userInfoMap);
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();

    // Cleanup function for image URLs
    return () => {
      Object.values(userInfo).forEach(info => {
        if (info.imageUrl) {
          URL.revokeObjectURL(info.imageUrl);
        }
      });
      if (currentUser.userImage) {
        URL.revokeObjectURL(currentUser.userImage);
      }
    };
  }, [bookId]);

  const ReviewCard = ({ review, isUserReview }) => (
    <div className="border border-yellow-200 bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {userInfo[review.user.id]?.imageUrl ? (
            <img
              src={userInfo[review.user.id].imageUrl}
              alt={userInfo[review.user.id].username}
              className="w-12 h-12 rounded-full object-cover border-2 border-yellow-200"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <User className="w-6 h-6 text-yellow-600" />
            </div>
          )}
          <div>
            <span className="font-medium text-gray-800">
              {userInfo[review.user.id]?.username || 'Anonymous'}
            </span>
            {isUserReview && (
              <span className="ml-2 bg-yellow-600 text-white text-xs px-2 py-1 rounded">
                Your Review
              </span>
            )}
            <div className="text-sm text-gray-500">
              Review #{review.id}
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-700 mt-3 mb-4">{review.description}</p>

      <div className="mt-4 pt-4 border-t border-yellow-100 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-600" />
          <span>Book Name: {review.book.name}</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <>
        <UserHeader {...currentUser} />
        <div className="flex justify-center items-center min-h-screen bg-yellow-50">
          <Loader2 className="animate-spin text-yellow-600 w-8 h-8" />
          <p className="text-yellow-600 ml-2">Loading reviews...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <UserHeader {...currentUser} />
        <div className="flex justify-center items-center min-h-screen bg-yellow-50">
          <AlertCircle className="text-red-600 w-8 h-8" />
          <p className="text-red-600 ml-2">Error: {error}</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <UserHeader {...currentUser} />
      <div className="min-h-screen bg-yellow-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-yellow-800 mb-6">Book Reviews</h1>

          <div className="grid gap-4">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                isUserReview={review.user.id === customerId}
              />
            ))}

            {reviews.length === 0 && (
              <div className="text-center p-8 bg-white rounded-lg border border-yellow-200">
                <AlertCircle className="text-yellow-800 w-8 h-8 mx-auto" />
                <p className="text-yellow-800 mt-2">No reviews found for this book.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewReviews;