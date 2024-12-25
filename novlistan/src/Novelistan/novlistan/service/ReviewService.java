package Novelistan.novlistan.service;

import Novelistan.novlistan.repository.ReviewRepository;
import Novelistan.novlistan.repository.UserRepo;
import Novelistan.novlistan.repository.BookRespo;
import java.util.List;
import Novelistan.novlistan.model.Review;
import java.util.Optional;

@Service
public class ReviewService {
	@Autowired
	private ReviewRepository _reviewRepository;
	@Autowired
	private UserRepo _userRepository;
	@Autowired
	private BookRespo _bookRepository;

	public java.util.List<Review> getAllReviews() {
		throw new UnsupportedOperationException();
	}

	public java.util.Optional<Review> getReviewById(Long aId) {
		throw new UnsupportedOperationException();
	}

	public Review createReview(Review aReview) {
		throw new UnsupportedOperationException();
	}

	public Review updateReview(Long aId, Review aReviewDetails) {
		throw new UnsupportedOperationException();
	}

	public void deleteReview(Long aId) {
		throw new UnsupportedOperationException();
	}

	public java.util.List<Review> getAllReviewsById(Long aId) {
		throw new UnsupportedOperationException();
	}
}