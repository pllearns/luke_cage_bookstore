DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS genres;

CREATE TABLE genres (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS book_genres;

CREATE TABLE book_genres (
  book_id INTEGER NOT NULL,
  genre_id INTEGER NOT NULL
);

DROP TABLE IF EXISTS authors;

CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS author_books;

CREATE TABLE author_books (
  author_id INTEGER NOT NULL,
  book_id INTEGER NOT NULL
);

SELECT now();

SELECT * FROM books WHERE title LIKE '%something%';

SELECT
  books.*
FROM
  books
LEFT JOIN
  book_genres
ON
  books.id = book_genres.book_id
LEFT JOIN
  genres
ON
  genres.id = book_genres.genre_id
WHERE
  genres.title = 'Comics';

SELECT
  books.*
FROM
  books
JOIN
  author_books
ON
  books.id = author_books.book_id
JOIN
  authors
ON
  authors.id = author_books.author_id
WHERE
  authors.name = 'Alex Haley';
