package Novelistan.novlistan.service;

import Novelistan.novlistan.model.Book;
import Novelistan.novlistan.model.Review;
import Novelistan.novlistan.model.User;

import Novelistan.novlistan.repository.BookRespo;
import Novelistan.novlistan.repository.ReviewRepository;

import Novelistan.novlistan.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private BookRespo bookRepository;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Optional<Review> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    public Review createReview(Review review) {
        // Ensure the user and book exist before saving
        userRepository.findById(review.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found with id " + review.getUser().getId()));

        bookRepository.findById(review.getBook().getId())
                .orElseThrow(() -> new RuntimeException("Book not found with id " + review.getBook().getId()));

        return reviewRepository.save(review);
    }

    public Review updateReview(Long id, Review reviewDetails) {
        // Find the existing review
        Review review = reviewRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Review not found with id " + id));

        // Set the updated user and book
        User user = userRepository.findById(reviewDetails.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found with id " + reviewDetails.getUser().getId()));
        review.setUser(user);

        Book book = bookRepository.findById(reviewDetails.getBook().getId())
                .orElseThrow(() -> new RuntimeException("Book not found with id " + reviewDetails.getBook().getId()));
        review.setBook(book);

        // Update the description
        review.setDescription(reviewDetails.getDescription());

        return reviewRepository.save(review);
    }

    public void deleteReview(Long id) {
    }

    public List<Review> getAllReviewsById(Long id) {
        List<Review> reviews= reviewRepository.findAllByBookId(id);
        return reviews;
    }
}
