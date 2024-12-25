package Novelistan.novlistan.model;

import java.time.LocalDate;

@Entity
public class Author {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long _id;
	private String _name;
	@Column (
		nullable = false,
		unique = true
	)
	private String _username;
	private String _password;
	private LocalDate _dateOfBirth;
	@Column (
		nullable = false,
		unique = true
	)
	private String _email;
	private String _securityCode;

	public void setId(Long aId) {
		this._id = aId;
	}

	public Long getId() {
		return this._id;
	}

	public void setName(String aName) {
		this._name = aName;
	}

	public String getName() {
		return this._name;
	}

	public void setUsername(String aUsername) {
		this._username = aUsername;
	}

	public String getUsername() {
		return this._username;
	}

	public void setPassword(String aPassword) {
		this._password = aPassword;
	}

	public String getPassword() {
		return this._password;
	}

	public void setDateOfBirth(LocalDate aDateOfBirth) {
		this._dateOfBirth = aDateOfBirth;
	}

	public LocalDate getDateOfBirth() {
		return this._dateOfBirth;
	}

	public void setEmail(String aEmail) {
		this._email = aEmail;
	}

	public String getEmail() {
		return this._email;
	}

	public void setSecurityCode(String aSecurityCode) {
		this._securityCode = aSecurityCode;
	}

	public String getSecurityCode() {
		return this._securityCode;
	}
}