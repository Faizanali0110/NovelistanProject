package Novelistan.novlistan.controller;

import Novelistan.novlistan.model.Author;
import Novelistan.novlistan.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(
        origins = "*",
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
)
@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @GetMapping("/all")
    public List<Author> getAllAuthors() {
        return authorService.getAllAuthors();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Author> getAuthorById(@PathVariable Long id) {
        Optional<Author> author = authorService.getAuthorById(id);
        return author.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }




    @PutMapping("/{id}")
    public ResponseEntity<Author> updateAuthor(@PathVariable Long id, @RequestBody Author author) {
        Optional<Author> existingAuthor = authorService.getAuthorById(id);

        if (existingAuthor.isPresent()) {
            Author currentAuthor = existingAuthor.get();

            // Validate if the username and securityCode match before updating
            if (currentAuthor.getUsername().equals(author.getUsername()) && currentAuthor.getSecurityCode().equals(author.getSecurityCode())) {
                Author updatedAuthor = authorService.updateAuthor(id, author);
                return ResponseEntity.ok(updatedAuthor);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        boolean isAuthenticated = authorService.checkLogin(email, password);
        System.out.println(isAuthenticated);
        if (isAuthenticated) {
            Long authorId = authorService.getAuthorIdByemail(email); // Get author ID by email
            System.out.println(ResponseEntity.ok(authorId));

            return ResponseEntity.ok(authorId); // Return the author ID
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAuthor(@PathVariable Long id, @RequestParam String username, @RequestParam String securityCode) {
        boolean isDeleted = authorService.deleteAuthor(id, username, securityCode);
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
