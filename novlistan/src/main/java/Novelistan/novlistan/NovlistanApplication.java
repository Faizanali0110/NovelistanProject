package Novelistan.novlistan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
public class NovlistanApplication {

	public static void main(String[] args) {
		// This prints a message when the application starts
		System.out.println("Application is starting...");

		SpringApplication.run(NovlistanApplication.class, args);
	}
}
