package Novelistan.novlistan.repository;

import Novelistan.novlistan.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRespo extends JpaRepository<Book, Long> {
    List<Book> findBooksByAuthorId(Long authorId);

    byte[] getImageById(Long id);

    List<Book> getFileById(Long id);

    List<Book> getBooksByGenre(String genre);

    Book getBooksById(Long id);

    // Search by title, ISBN, or genre using OR
    @Query("SELECT b FROM Book b WHERE " +
            "(LOWER(b.name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) OR " +
            "(CAST(b.isbn AS string) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) OR " +
            "(LOWER(b.genre) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Book> searchBooks(String searchTerm);

    // Correct method to get distinct genres
    @Query("SELECT DISTINCT b.genre FROM Book b")
    List<String> findDistinctGenres();
}
