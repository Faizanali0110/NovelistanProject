package Novelistan.novlistan.model;

@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long _id;
	@Column (
		nullable = false,
		unique = true
	)
	private String _username;
	private String _password;
	private String _secretCode;
	private String _imageType;
	@Column (
		nullable = false,
		unique = true
	)
	private String _email;
	@Lob
	private byte[] _image;

	public void setId(Long aId) {
		this._id = aId;
	}

	public Long getId() {
		return this._id;
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

	public void setSecretCode(String aSecretCode) {
		this._secretCode = aSecretCode;
	}

	public String getSecretCode() {
		return this._secretCode;
	}

	public void setImageType(String aImageType) {
		this._imageType = aImageType;
	}

	public String getImageType() {
		return this._imageType;
	}

	public void setEmail(String aEmail) {
		this._email = aEmail;
	}

	public String getEmail() {
		return this._email;
	}

	public void setImage(byte[] aImage) {
		this._image = aImage;
	}

	public byte[] getImage() {
		return this._image;
	}
}