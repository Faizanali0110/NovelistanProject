package Novelistan.novlistan.controller;

import Novelistan.novlistan.service.BookService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import Novelistan.novlistan.model.Book;

@RestController
@RequestMapping(value = "/api/book")
@CrossOrigin (
	origins = "*",
	allowedHeaders = "*"
)
public class BookController {
	private final BookService _bookService;
	private final ObjectMapper _objectMapper;

	@Autowired
	public BookController(BookService aBookService, ObjectMapper aObjectMapper) {
		throw new UnsupportedOperationException();
	}

	@PostMapping(value = "/addBook")
	public org.springframework.http.ResponseEntity<?> addBook(@RequestPart(value = "book") String aBookJson, @RequestPart(value = "file") MultipartFile aFile, @RequestPart(value = "image") MultipartFile aImage) {
		throw new UnsupportedOperationException();
	}

	@GetMapping(value = "/list/allBooks")
	public org.springframework.http.ResponseEntity<java.util.List<Novelistan.novlistan.model.Book>> getAllBooks() {
		throw new UnsupportedOperationException();
	}

	@GetMapping(value = "/authorBook/{id}")
	public org.springframework.http.ResponseEntity<java.util.List<Novelistan.novlistan.model.Book>> getAuthorBook(@PathVariable Long aId) {
		throw new UnsupportedOperationException();
	}

	@GetMapping(value = "/BookImageBlob/{id}")
	public org.springframework.http.ResponseEntity<byte[]> getImageBookBlob(@PathVariable Long aId) {
		throw new UnsupportedOperationException();
	}

	@GetMapping(value = "/BookPdf/{id}")
	public org.springframework.http.ResponseEntity<byte[]> getPdfBook(@PathVariable Long aId) {
		throw new UnsupportedOperationException();
	}

	@GetMapping(value = "/{isbn}")
	public org.springframework.http.ResponseEntity<Novelistan.novlistan.model.Book> getBookByIsbn(@PathVariable Long aIsbn) {
		throw new UnsupportedOperationException();
	}

	@PutMapping(value = "/update/{id}")
	public org.springframework.http.ResponseEntity<?> updateBook(@PathVariable Long aId, @RequestPart(value = "book") String aBookJson, @RequestPart(value = "file", required = false) MultipartFile aFile, @RequestPart(value = "image", required = false) MultipartFile aImage) {
		throw new UnsupportedOperationException();
	}

	@GetMapping(value = "/search/Book")
	public org.springframework.http.ResponseEntity<?> searchBook(@RequestParam String aSearch) {
		throw new UnsupportedOperationException();
	}

	@GetMapping(value = "/search/BookByGenre")
	public org.springframework.http.ResponseEntity<?> getBookByGenre(@RequestParam String aSearch) {
		throw new UnsupportedOperationException();
	}

	/**
	 * Updated deleteBook method in BookController
	 */
	@DeleteMapping(value = "/delete/{id}")
	public org.springframework.http.ResponseEntity<?> deleteBook(@PathVariable Long aId) {
		throw new UnsupportedOperationException();
	}
}