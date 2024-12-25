package Novelistan.novlistan.model;

@Entity
@Table(name = "book")
public class Book {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long _id;
	@Column(nullable = false)
	private String _name;
	@Column (
		nullable = false,
		unique = true
	)
	private Long _isbn;
	@Column(nullable = false)
	private String _genre;
	@Column(nullable = false)
	private String _imageName;
	private String _imageType;
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] _image;
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] _file;
	@ManyToOne
	@JoinColumn (
		name = "author_id",
		referencedColumnName = "id",
		nullable = false
	)
	private Author _author;

	/**
	 * Constructors
	 */
	public Book() {
		throw new UnsupportedOperationException();
	}

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

	public void setIsbn(Long aIsbn) {
		this._isbn = aIsbn;
	}

	public Long getIsbn() {
		return this._isbn;
	}

	public void setGenre(String aGenre) {
		this._genre = aGenre;
	}

	public String getGenre() {
		return this._genre;
	}

	public void setImageName(String aImageName) {
		this._imageName = aImageName;
	}

	public String getImageName() {
		return this._imageName;
	}

	public void setImageType(String aImageType) {
		this._imageType = aImageType;
	}

	public String getImageType() {
		return this._imageType;
	}

	public void setImage(byte[] aImage) {
		this._image = aImage;
	}

	public byte[] getImage() {
		return this._image;
	}

	public void setFile(byte[] aFile) {
		this._file = aFile;
	}

	public byte[] getFile() {
		return this._file;
	}

	public void setAuthor(Author aAuthor) {
		this._author = aAuthor;
	}

	public Author getAuthor() {
		return this._author;
	}
}