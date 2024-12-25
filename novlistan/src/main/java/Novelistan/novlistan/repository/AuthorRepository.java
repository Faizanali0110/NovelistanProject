package Novelistan.novlistan.repository;

import Novelistan.novlistan.model.Author;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    boolean findByEmail(String email);

    boolean findByPassword(String password);

    boolean existsByEmailAndPassword(String email, String password);

    Long getAuthorIdByEmail(String email);

    Author getAuthorsByEmail(String email);
}