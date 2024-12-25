package Novelistan.novlistan.controller;

import Novelistan.novlistan.model.File;
import Novelistan.novlistan.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
public class FileController {

    @Autowired
    FileService fileService;

    @PostMapping("upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            fileService.saveFile(file);
            return new ResponseEntity<>("File uploaded successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("File upload failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable("id") Long id)
    {
        Optional<File> file  =fileService.getFile(id);
        return ResponseEntity.ok().header("Content-Type","file/jpge").body(file.get().getFile());
    }
}
