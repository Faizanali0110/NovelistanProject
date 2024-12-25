package Novelistan.novlistan.controller;

import Novelistan.novlistan.model.Book;
import Novelistan.novlistan.service.BookService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/book")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class    BookController {

    private final BookService bookService;
    private final ObjectMapper objectMapper;

    @Autowired
    public BookController(BookService bookService, ObjectMapper objectMapper) {
        this.bookService = bookService;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/addBook")
    public ResponseEntity<?> addBook(
            @RequestPart("book") String bookJson,
            @RequestPart("file") MultipartFile file,
            @RequestPart("image") MultipartFile image
    ) {
        try {
            // Parse JSON string to Book object
            Book book = objectMapper.readValue(bookJson, Book.class);

            // Validate input
            if (book == null) {
                return ResponseEntity.badRequest().body("Invalid book data");
            }

            if (file == null || file.isEmpty()) {
                return ResponseEntity.badRequest().body("Book file is required");
            }

            if (image == null || image.isEmpty()) {
                return ResponseEntity.badRequest().body("Book cover image is required");
            }

            // Create book
            Book createdBook = bookService.createBook(book, file, image);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdBook);

        } catch (Exception e) {
            // Log the error
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing book: " + e.getMessage());
        }
    }

    @GetMapping("/list/allBooks")
    public ResponseEntity<List<Book>> getAllBooks() {
        try {
            List<Book> books = bookService.getAllBooks();
            if (books.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(books);
            }
            return ResponseEntity.ok(books);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/authorBook/{id}")
    public ResponseEntity<List<Book>> getAuthorBook(@PathVariable Long id) {
        try {
            List<Book> books = bookService.getBooksByAuthorId(id); // Implement this in BookService
            if (books.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(books);
            }
            return ResponseEntity.ok(books);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
    @GetMapping("/BookImageBlob/{id}")
    public ResponseEntity<byte[]> getImageBookBlob(@PathVariable Long id) {
        try {
            Book book = bookService.getBookById(id);
            byte[] image = book.getImage();
            if (image == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.valueOf(book.getImageType()))
                    .body(image);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/BookPdf/{id}")
    public ResponseEntity<byte[]> getPdfBook(@PathVariable Long id) {
        try {
            byte[] pdf = bookService.getBookPdfByID(id);
            if (pdf == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 when PDF is not found
            }
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdf);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Return 500 on error
        }
    }





    @GetMapping("/{isbn}")
    public ResponseEntity<Book> getBookByIsbn(@PathVariable Long isbn) {
        try {
            Book book = bookService.getBookByIsbn(isbn);
            if (book == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(book);
        } catch (Exception e) {
            // Log the error
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateBook(
            @PathVariable Long id,
            @RequestPart("book") String bookJson,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        try {
            // Parse JSON string to Book object
            Book bookDetails = objectMapper.readValue(bookJson, Book.class);

            // Update book
            Book updatedBook = bookService.updateBook(id, bookDetails, file, image);

            if (updatedBook == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(updatedBook);

        } catch (Exception e) {
            // Log the error
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating book: " + e.getMessage());
        }
    }

    @GetMapping("/search/Book")
    public  ResponseEntity<?> searchBook(@RequestParam String search)
    {
        try {
            List<Book> books=bookService.getSearchBook(search);
           if(books!=null)
           {
               return ResponseEntity.ok(books);
           }
           else
           {
               return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book Not found");
           }
        }
        catch (Exception e)

        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting book: " + e.getMessage());
        }
    }





    @GetMapping("/search/BookByGenre")
    public  ResponseEntity<?> getBookByGenre(@RequestParam String search)
    {
        try {
            List<Book> books=bookService.getBooksByGenre(search);
            if(books!=null)
            {
                return ResponseEntity.ok(books);
            }
            else
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book Not found");
            }
        }
        catch (Exception e)

        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting book: " + e.getMessage());
        }
    }





    // Updated deleteBook method in BookController
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        try {
            boolean deleted = bookService.deleteBook(id);
            if (!deleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book not found");
            }
            return ResponseEntity.ok("Book deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting book: " + e.getMessage());
        }
    }

}