package Novelistan.novlistan.repository;

import Novelistan.novlistan.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Long> {
    User findByEmailAndPassword(String email, String password);
}
