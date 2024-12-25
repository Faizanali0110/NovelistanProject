package Novelistan.novlistan.repository;

import java.util.List;
import Novelistan.novlistan.model.Book;

public interface BookRespo {

	public java.util.List<Book> findBooksByAuthorId(Long aAuthorId);

	public byte[] getImageById(Long aId);

	public java.util.List<Book> getFileById(Long aId);

	public java.util.List<Book> getBooksByGenre(String aGenre);

	public Book getBooksById(Long aId);

	/**
	 * Search by title, ISBN, or genre using OR
	 */
	@Query(value = "SELECT b FROM Book b WHERE " +
            "(LOWER(b.name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) OR " +
            "(CAST(b.isbn AS string) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) OR " +
            "(LOWER(b.genre) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
	public java.util.List<Book> searchBooks(String aSearchTerm);

	/**
	 * Correct method to get distinct genres
	 */
	@Query(value = "SELECT DISTINCT b.genre FROM Book b")
	public java.util.List<String> findDistinctGenres();
}