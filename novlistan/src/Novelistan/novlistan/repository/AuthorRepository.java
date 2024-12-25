package Novelistan.novlistan.repository;

import Novelistan.novlistan.model.Author;

@Repository
public interface AuthorRepository {

	public boolean findByEmail(String aEmail);

	public boolean findByPassword(String aPassword);

	public boolean existsByEmailAndPassword(String aEmail, String aPassword);

	public Long getAuthorIdByEmail(String aEmail);

	public Author getAuthorsByEmail(String aEmail);
}