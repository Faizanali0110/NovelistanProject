package Novelistan.novlistan.service;

import Novelistan.novlistan.repository.AuthorRepository;
import java.util.List;
import Novelistan.novlistan.model.Author;
import java.util.Optional;

@Service
public class AuthorService {
	@Autowired
	private AuthorRepository _authorRepository;

	/**
	 * Retrieve all authors
	 */
	public java.util.List<Author> getAllAuthors() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Retrieve an author by their ID
	 */
	public java.util.Optional<Author> getAuthorById(Long aAuthorId) {
		throw new UnsupportedOperationException();
	}

	/**
	 * Create a new author
	 */
	public Author createAuthor(Author aAuthor) {
		throw new UnsupportedOperationException();
	}

	/**
	 * Update an author
	 */
	public Author updateAuthor(Long aAuthorId, Author aAuthor) {
		throw new UnsupportedOperationException();
	}

	/**
	 * Delete an author
	 */
	public boolean deleteAuthor(Long aAuthorId, String aUsername, String aSecurityCode) {
		throw new UnsupportedOperationException();
	}

	public boolean checkLogin(String aEmail, String aPassword) {
		throw new UnsupportedOperationException();
	}

	public Long getAuthorIdByemail(String aEmail) {
		throw new UnsupportedOperationException();
	}
}