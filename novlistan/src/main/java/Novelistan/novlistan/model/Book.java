package Novelistan.novlistan.model;

import jakarta.persistence.*;

@Entity
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    @Column(nullable = false , unique = true)
    private  Long isbn;

    @Column(nullable = false)
    private String genre;
    @Column(nullable = false)
    private String imageName;
    private String imageType;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] image;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] file;





    @ManyToOne
    @JoinColumn(name = "author_id", referencedColumnName = "id", nullable = false) // Foreign key reference
    private Author author;

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }


    // Constructors
    public Book() {}


    // Getters and Setters
    public Long getIsbn() {
        return isbn;
    }

    public void setIsbn(Long isbn) {
        this.isbn = isbn;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public Long getId() {
        return id;
    }
}
