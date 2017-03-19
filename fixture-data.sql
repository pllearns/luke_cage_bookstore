SELECT now();

INSERT INTO
  books (title)
VALUES
  ('Luke Cage Noir'),
  ('The Autobiography of Malcolm X'),
  ('The Beautiful Struggle'),
  ('To Die For The People'),
  ('Seize The Time');

INSERT INTO
  genres (title)
VALUES
  ('Biography'),
  ('History'),
  ('Horror'),
  ('Comics');

INSERT INTO
  authors (name)
VALUES
    ('Mike Benson'),
    ('Alex Haley'),
    ('Ta-Nehisi Coates'),
    ('Huey P. Newton'),
    ('Bobby Seale');

INSERT INTO
  author_books
SELECT
  authors.id, books.id
FROM
  books
CROSS JOIN
  authors
WHERE
  books.title = 'Luke Cage Noir'
AND
  authors.name = 'Mike Benson';

INSERT INTO
  author_books
SELECT
  authors.id, books.id
FROM
  books
CROSS JOIN
  authors
WHERE
  books.title = 'The Autobiography of Malcolm X'
AND
  authors.name = 'Alex Haley';

INSERT INTO
  author_books
SELECT
  authors.id, books.id
FROM
  books
CROSS JOIN
  authors
WHERE
  books.title = 'The Beautiful Struggle'
AND
  authors.name = 'Ta-Nehisi Coates';

INSERT INTO
  book_genres
SELECT
  books.id, genres.id
FROM
  books
CROSS JOIN
  genres
WHERE
  books.title = 'To Die For The People'
AND
  genres.title = 'History';

INSERT INTO
  book_genres
SELECT
  books.id, genres.id
FROM
  books
CROSS JOIN
  genres
WHERE
  books.title = 'Luke Cage Noir'
AND
  genres.title = 'Comics';

INSERT INTO
  book_genres
SELECT
  books.id, genres.id
FROM
  books
CROSS JOIN
  genres
WHERE
  books.title = 'Seize The Time'
AND
  genres.title = 'History';

SELECT now();

SELECT * FROM author_books;
