package Novelistan.novlistan.service;

import Novelistan.novlistan.repository.BookRespo;
import Novelistan.novlistan.model.Book;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@Service
public class BookService {
	private final BookRespo _bookRespo;
	private final AuthorService _authorService;

	/**
	 * Inject AuthorService
	 */
	@Autowired
	public BookService(BookRespo aBookRespo, AuthorService aAuthorService) {
		throw new UnsupportedOperationException();
	}

	public Book createBook(Book aBook, MultipartFile aFile, MultipartFile aImage) throws java.io.IOException {
		throw new UnsupportedOperationException();
	}

	public java.util.List<Book> getAllBooks() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Get Book by ISBN
	 */
	public Book getBookByIsbn(Long aId) {
		throw new UnsupportedOperationException();
	}

	/**
	 * Update Book
	 */
	public Book updateBook(Long aId, Book aBookDetails, MultipartFile aFile, MultipartFile aImage) throws java.io.IOException {
		throw new UnsupportedOperationException();
	}

	public boolean deleteBook(Long aId) {
		throw new UnsupportedOperationException();
	}

	/**
	 * Get Books by Author
	 */
	public java.util.List<Book> getBooksByAuthor(Long aAuthorId) {
		throw new UnsupportedOperationException();
	}

	public java.util.List<Book> getBooksByAuthorId(Long aAuthorId) {
		throw new UnsupportedOperationException();
	}

	public byte[] getBookCoverByID(Long aId) {
		throw new UnsupportedOperationException();
	}

	public byte[] getBookPdfByID(Long aId) {
		throw new UnsupportedOperationException();
	}

	public Book getBookById(Long aId) {
		throw new UnsupportedOperationException();
	}

	public java.util.List<Book> getSearchBook(String aSearch) {
		throw new UnsupportedOperationException();
	}

	public java.util.List<Book> getBooksByGenre(String aGenre) {
		throw new UnsupportedOperationException();
	}
}