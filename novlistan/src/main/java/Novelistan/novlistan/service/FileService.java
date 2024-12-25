package Novelistan.novlistan.service;

import Novelistan.novlistan.model.File;
import Novelistan.novlistan.repository.FileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class FileService {
    @Autowired
    private FileRepo fileRepo;

    public void saveFile(MultipartFile file) {
        try {
            File file1=new File();
            file1.setFile(file.getBytes());
            fileRepo.save(file1);
        } catch (IOException e) {
            // Handle the exception, e.g., log it or rethrow it
            e.printStackTrace();
        }
    }

    public Optional<File> getFile(Long id)
    {
        return fileRepo.findById(id);
    }
}