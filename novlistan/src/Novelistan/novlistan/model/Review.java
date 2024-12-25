package Novelistan.novlistan.model;

@Entity
@Table(name = "reviews")
public class Review {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long _id;
	@ManyToOne
	@JoinColumn (
		name = "user_id",
		referencedColumnName = "id",
		nullable = false
	)
	private User _user;
	@Column (
		name = "description",
		nullable = false
	)
	private String _description;
	@ManyToOne
	@JoinColumn (
		name = "book_id",
		referencedColumnName = "id",
		nullable = false
	)
	private Book _book;

	public void setId(Long aId) {
		this._id = aId;
	}

	public Long getId() {
		return this._id;
	}

	public void setUser(User aUser) {
		this._user = aUser;
	}

	public User getUser() {
		return this._user;
	}

	public void setDescription(String aDescription) {
		this._description = aDescription;
	}

	public String getDescription() {
		return this._description;
	}

	public void setBook(Book aBook) {
		this._book = aBook;
	}

	public Book getBook() {
		return this._book;
	}
}