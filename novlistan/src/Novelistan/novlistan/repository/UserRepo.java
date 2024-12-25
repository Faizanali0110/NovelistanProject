package Novelistan.novlistan.repository;

import Novelistan.novlistan.model.User;

public interface UserRepo {

	public User findByEmailAndPassword(String aEmail, String aPassword);
}