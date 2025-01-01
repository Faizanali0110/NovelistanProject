package Novelistan.novlistan.controller;

import Novelistan.novlistan.model.Review;
import Novelistan.novlistan.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/reviewByBookID/{id}")
    public ResponseEntity<?> getReviewBook(@PathVariable Long id) {
        try {
            List<Review> reviews = reviewService.getAllReviewsById(id);
            if (reviews != null && !reviews.isEmpty()) {
                return ResponseEntity.ok(reviews); // Return 200 OK with the list of reviews
            } else {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No reviews found for the given book ID."); // Return 204 No Content
            }
        } catch (IllegalArgumentException e) {
            // Handle cases where the provided ID is invalid
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid book ID provided.");
        } catch (Exception e) {
            // Log and handle any other unexpected exceptions
            System.err.println("Error fetching reviews by book ID: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while fetching the reviews.");
        }
    }



    @GetMapping("/all")
    public ResponseEntity<List<Review>> GetAllReview() {
        try {
            List<Review> reviews = reviewService.getAllReviews();
            if (reviews != null && !reviews.isEmpty()) {
                return ResponseEntity.ok(reviews); // Return 200 OK with the list of reviews
            } else {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null); // Return 204 No Content
            }
        } catch (Exception e) {
            // Log the exception (optional)
            System.err.println("Error fetching reviews: " + e.getMessage());
            e.printStackTrace();

            // Return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // Return 500 Internal Server Error
        }
    }

    @PostMapping
    public Review createReview(@RequestBody Review review) {
        return reviewService.createReview(review);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody Review reviewDetails) {
        return ResponseEntity.ok(reviewService.updateReview(id, reviewDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
