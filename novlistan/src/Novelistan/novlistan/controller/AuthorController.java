package Novelistan.novlistan.controller;

import Novelistan.novlistan.service.AuthorService;
import java.util.List;
import Novelistan.novlistan.model.Author;
import org.springframework.http.ResponseEntity;

@CrossOrigin (
	origins = "*",
	allowedHeaders = "*",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
)
@RestController
@RequestMapping(value = "/api/authors")
public class AuthorController {
	@Autowired
	private AuthorService _authorService;

	@GetMapping(value = "/all")
	public java.util.List<Novelistan.novlistan.model.Author> getAllAuthors() {
		throw new UnsupportedOperationException();
	}

	@GetMapping(value = "/{id}")
	public org.springframework.http.ResponseEntity<Novelistan.novlistan.model.Author> getAuthorById(@PathVariable Long aId) {
		throw new UnsupportedOperationException();
	}

	@PostMapping(value = "/addAuthor")
	public org.springframework.http.ResponseEntity<Novelistan.novlistan.model.Author> createAuthor(@RequestBody Author aAuthor) {
		throw new UnsupportedOperationException();
	}

	@PutMapping(value = "/{id}")
	public org.springframework.http.ResponseEntity<Novelistan.novlistan.model.Author> updateAuthor(@PathVariable Long aId, @RequestBody Author aAuthor) {
		throw new UnsupportedOperationException();
	}

	@PostMapping(value = "/login")
	public org.springframework.http.ResponseEntity<?> login(@RequestParam String aEmail, @RequestParam String aPassword) {
		throw new UnsupportedOperationException();
	}

	@DeleteMapping(value = "/{id}")
	public org.springframework.http.ResponseEntity<void> deleteAuthor(@PathVariable Long aId, @RequestParam String aUsername, @RequestParam String aSecurityCode) {
		throw new UnsupportedOperationException();
	}
}