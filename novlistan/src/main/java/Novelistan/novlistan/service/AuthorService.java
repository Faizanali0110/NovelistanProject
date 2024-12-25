package Novelistan.novlistan.service;


import Novelistan.novlistan.model.Author;
import Novelistan.novlistan.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    // Retrieve all authors
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    // Retrieve an author by their ID
    public Optional<Author> getAuthorById(Long authorId) {
        return authorRepository.findById(authorId);
    }

    // Create a new author
    public Author createAuthor(Author author) {
        return authorRepository.save(author);
    }

    // Update an author
    public Author updateAuthor(Long authorId, Author author) {
        Optional<Author> existingAuthor = authorRepository.findById(authorId);

        // Check if the author exists
        if (existingAuthor.isPresent()) {
            Author currentAuthor = existingAuthor.get();

            // Validate if the username and securityCode match
            if (currentAuthor.getUsername().equals(author.getUsername()) &&
                    currentAuthor.getSecurityCode().equals(author.getSecurityCode())) {

                // Perform the update
                author.setId(authorId);
                return authorRepository.save(author);
            }
        }
        return null; // Return null if validation fails or author not found
    }

    // Delete an author
    public boolean deleteAuthor(Long authorId, String username, String securityCode) {
        Optional<Author> existingAuthor = authorRepository.findById(authorId);

        // Check if the author exists
        if (existingAuthor.isPresent()) {
            Author currentAuthor = existingAuthor.get();

            // Validate if the username and securityCode match
            if (currentAuthor.getUsername().equals(username) && currentAuthor.getSecurityCode().equals(securityCode)) {
                authorRepository.deleteById(authorId);
                return true; // Author deleted successfully
            }
        }
        return false; // Return false if validation fails or author not found
    }


    public boolean checkLogin(String email, String password) {
        boolean status=authorRepository.existsByEmailAndPassword( email,password);
        if(status)
        {
            return  true;

        }
        else
        {
            return false;
        }

    }

    public Long getAuthorIdByemail(String email) {
        Author author=authorRepository.getAuthorsByEmail(email);
        return  author.getId();
    }
}