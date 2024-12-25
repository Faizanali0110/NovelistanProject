package Novelistan.novlistan.controller;

import Novelistan.novlistan.model.Book;
import Novelistan.novlistan.model.User;
import Novelistan.novlistan.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*", allowedHeaders = "*")

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    private final ObjectMapper objectMapper;

    public UserController(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @PostMapping("/addUser")
    public ResponseEntity<?> addUser(@RequestPart("user") String userJson, @RequestPart("image") MultipartFile image) {
        try {
            System.out.println("Received JSON: " + userJson);
            User user = objectMapper.readValue(userJson, User.class);
            System.out.println("Parsed User: " + user.getUsername());

            User savedUser = userService.createUser(user, image);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error occurred while adding the user.");
        }
    }

    @PostMapping("/api/userLogin")
    public ResponseEntity<?> userLogin(@RequestParam("email") String email, @RequestParam("password") String password) {
        try {
            // Check if user exists and credentials are valid
            User user = userService.validateUser(email, password);

            if (user != null) {
                return ResponseEntity.ok(user.getId()); // Return user id details on successful login
            } else {
                return ResponseEntity.status(401).body("Invalid email or password."); // Unauthorized response
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error occurred while logging in.");
        }
    }
    @GetMapping("/api/customerImage/{id}")
    public ResponseEntity<byte[]> getImageUserBlob(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            byte[] image = user.getImage();
            if (image == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.valueOf(user.getImageType()))
                    .body(image);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/api/Customer/UserName/{id}")
    public ResponseEntity<?> getUserName(@PathVariable long id)
    {
        try {
            User user=userService.getUserById(id);
            long userId;
            if(user!=null)
            {
                userId=user.getId();
                return  ResponseEntity.ok(userId);
            }
            else
            {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        }catch (Exception e)
        {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



}
