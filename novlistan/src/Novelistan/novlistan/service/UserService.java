package Novelistan.novlistan.service;

import Novelistan.novlistan.repository.UserRepo;
import Novelistan.novlistan.controller.UserController;
import Novelistan.novlistan.model.User;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
public class UserService {
	@Autowired
	private UserRepo _userRepo;
	public UserController _unnamed_UserController_;

	public User createUser(User aUser, MultipartFile aImage) throws java.io.IOException {
		throw new UnsupportedOperationException();
	}

	public User validateUser(String aEmail, String aPassword) {
		throw new UnsupportedOperationException();
	}

	public User getUserById(Long aId) {
		throw new UnsupportedOperationException();
	}
}