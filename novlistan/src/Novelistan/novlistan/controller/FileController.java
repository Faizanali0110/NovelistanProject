package Novelistan.novlistan.controller;

import Novelistan.novlistan.service.FileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileController {
	@Autowired
	FileService _fileService;

	@PostMapping(value = "upload")
	public org.springframework.http.ResponseEntity<String> uploadFile(@RequestParam(value = "file") MultipartFile aFile) {
		throw new UnsupportedOperationException();
	}

	@PostMapping(value = "/download/{id}")
	public org.springframework.http.ResponseEntity<byte[]> downloadFile(@PathVariable(value = "id") Long aId) {
		throw new UnsupportedOperationException();
	}
}