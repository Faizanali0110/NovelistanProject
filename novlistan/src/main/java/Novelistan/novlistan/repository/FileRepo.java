package Novelistan.novlistan.repository;

import Novelistan.novlistan.model.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepo extends JpaRepository<File,Long> {
}
