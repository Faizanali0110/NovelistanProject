package Novelistan.novlistan.repository;

import java.util.List;
import Novelistan.novlistan.model.Review;

@Repository
public interface ReviewRepository {

	public java.util.List<Review> findAllByBookId(Long aId);
}