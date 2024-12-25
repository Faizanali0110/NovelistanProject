package Novelistan.novlistan.controller;

import Novelistan.novlistan.service.ReviewService;
import org.springframework.http.ResponseEntity;
import java.util.List;
import Novelistan.novlistan.model.Review;

@RestController
@RequestMapping(value = "/api/reviews")
public class ReviewController {
	@Autowired
	private ReviewService _reviewService;

	@GetMapping(value = "/reviewByBookID")
	public org.springframework.http.ResponseEntity<?> getReviewBook(@RequestParam Long aId) {
		throw new UnsupportedOperationException();
	}

	@GetMapping(value = "/all")
	public org.springframework.http.ResponseEntity<java.util.List<Novelistan.novlistan.model.Review>> GetAllReview() {
		throw new UnsupportedOperationException();
	}

	@PostMapping
	public Review createReview(@RequestBody Review aReview) {
		throw new UnsupportedOperationException();
	}

	@PutMapping(value = "/{id}")
	public org.springframework.http.ResponseEntity<Novelistan.novlistan.model.Review> updateReview(@PathVariable Long aId, @RequestBody Review aReviewDetails) {
		throw new UnsupportedOperationException();
	}

	@DeleteMapping(value = "/{id}")
	public org.springframework.http.ResponseEntity<void> deleteReview(@PathVariable Long aId) {
		throw new UnsupportedOperationException();
	}
}