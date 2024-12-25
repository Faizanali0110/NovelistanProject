package Novelistan.novlistan.service;

import Novelistan.novlistan.model.Author;
import Novelistan.novlistan.model.Book;
import Novelistan.novlistan.repository.BookRespo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    private final BookRespo bookRespo;
    private final AuthorService authorService;  // Inject AuthorService

    @Autowired
    public BookService(BookRespo bookRespo, AuthorService authorService) {
        this.bookRespo = bookRespo;
        this.authorService = authorService;  // Initialize AuthorService
    }

    public Book createBook(Book book, MultipartFile file, MultipartFile image) throws IOException {
        // Process and set the image
        if (file != null && !file.isEmpty()) {
            book.setFile(file.getBytes());  // Book file
        }
        if (image != null && !image.isEmpty()) {
            book.setImage(image.getBytes());  // Book cover image
            book.setImageName(image.getOriginalFilename());
            book.setImageType(image.getContentType());
        }

        // Get the Author by ID and set it to the Book
        Optional<Author> author = authorService.getAuthorById(book.getAuthor().getId());
        book.setAuthor(author.orElse(null));  // Ensure the Author is set correctly

        // Save the book to the database
        return bookRespo.save(book);
    }

    public List<Book> getAllBooks()
    {
        List<Book> books= bookRespo.findAll();
        return  books;
    }


    // Get Book by ISBN
    public Book getBookByIsbn(Long id) {
        Optional<Book> book = bookRespo.findById(id);
        return book.orElse(null);  // If not found, return null or throw exception
    }

    // Update Book
    public Book updateBook(Long id, Book bookDetails, MultipartFile file, MultipartFile image) throws IOException {
        Book existingBook = getBookById(id);
        if (existingBook == null) {
            return null;
        }

        // Update the basic fields
        existingBook.setName(bookDetails.getName());
        existingBook.setGenre(bookDetails.getGenre());
        existingBook.setIsbn(bookDetails.getIsbn());

        // If new files are provided, update them
        if (file != null && !file.isEmpty()) {
            existingBook.setFile(file.getBytes());
        }

        if (image != null && !image.isEmpty()) {
            existingBook.setImage(image.getBytes());
            existingBook.setImageName(image.getOriginalFilename());
            existingBook.setImageType(image.getContentType());
        }

        return bookRespo.save(existingBook);
    }
    public boolean deleteBook(Long id) {
        try {
            Book existingBook = getBookById(id);
            if (existingBook != null) {
                bookRespo.delete(existingBook);  // Assuming bookRespo is the repository interface
                return true;
            } else {
                return false;  // Book not found
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;  // If there's any issue with the deletion process
        }
    }


    // Get Books by Author
    public List<Book> getBooksByAuthor(Long authorId) {
        return bookRespo.findBooksByAuthorId(authorId);  // Assuming the repository has this method
    }

    public List<Book> getBooksByAuthorId(Long authorId) {
        // Use the repository method to fetch books by author ID
        return bookRespo.findBooksByAuthorId(authorId);
    }


    public byte[] getBookCoverByID(Long id) {
       Book book=bookRespo.getBooksById(id);
       return book.getImage();
    }


    public byte[] getBookPdfByID(Long id) {
        Book book=bookRespo.getBooksById(id);
        return book.getFile();
    }

    public Book getBookById(Long id) {
        Book book=bookRespo.getBooksById(id);
        return  book;
    }
    public List<Book> getSearchBook(String search)
    {
        List<Book> books=bookRespo.searchBooks(search);
        return  books;
    }
    public  List<Book> getBooksByGenre(String genre)
    {
        List<Book> books =bookRespo.getBooksByGenre(genre);
        return  books;
    }
}
