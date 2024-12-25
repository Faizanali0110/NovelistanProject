package Novelistan.novlistan.controller;

import Novelistan.novlistan.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin (
	origins = "*",
	allowedHeaders = "*"
)
@RestController
public class UserController {
	@Autowired
	private UserService _userService;
	private final ObjectMapper _objectMapper;
	public UserService _unnamed_UserService_;

	public UserController(ObjectMapper aObjectMapper) {
		throw new UnsupportedOperationException();
	}

	@PostMapping(value = "/addUser")
	public org.springframework.http.ResponseEntity<?> addUser(@RequestPart(value = "user") String aUserJson, @RequestPart(value = "image") MultipartFile aImage) {
		throw new UnsupportedOperationException();
	}

	@PostMapping(value = "/api/userLogin")
	public org.springframework.http.ResponseEntity<?> userLogin(@RequestParam(value = "email") String aEmail, @RequestParam(value = "password") String aPassword) {
		throw new UnsupportedOperationException();
	}

	@GetMapping(value = "/api/customerImage/{id}")
	public org.springframework.http.ResponseEntity<byte[]> getImageUserBlob(@PathVariable Long aId) {
		throw new UnsupportedOperationException();
	}

	@GetMapping(value = "/api/Customer/UserName/{id}")
	public org.springframework.http.ResponseEntity<?> getUserName(@PathVariable long aId) {
		throw new UnsupportedOperationException();
	}
}