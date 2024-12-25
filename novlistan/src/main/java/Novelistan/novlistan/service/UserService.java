package Novelistan.novlistan.service;

import Novelistan.novlistan.model.User;
import Novelistan.novlistan.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    public User createUser(User user, MultipartFile image) throws IOException {
        if(image!=null && !image.isEmpty())
        {
            user.setImageType(image.getContentType());
            user.setImage(image.getBytes());
        }
        return   userRepo.save(user);
    }

    public User validateUser(String email, String password) {
        return userRepo.findByEmailAndPassword(email,password);
    }

    public User getUserById(Long id) {
        Optional<User> user= userRepo.findById(id);
        return user.orElse(null);
    }
}
