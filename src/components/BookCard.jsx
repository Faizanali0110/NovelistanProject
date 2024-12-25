import React from 'react';

const BookCard = ({ book, onDownload }) => {
  const { name, genre, author, image, fileUrl } = book;

  return (
    <div className="book-card">
      <img src={`data:image/jpeg;base64,${image}`} alt={`${name} cover`} />
      <h3>{name}</h3>
      <p><strong>Genre:</strong> {genre}</p>
      <p><strong>Author:</strong> {author}</p>
      <button className="download-btn" onClick={() => onDownload(fileUrl)}>
        Download PDF
      </button>
    </div>
  );
};

export default BookCard;
