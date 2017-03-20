const express = require('express');
const router = express.Router();
const database = require('../database');

router.post('/', function(request, response) {
  database.createAuthor(request.body.author)
    .catch(function(error){
      res.status(500).send(error)
    })
    .then(function(author){
      res.redirect('/authors/'+author.id)
    })
});


router.get('/:bookId', function(request, response) {
  database.getBookWithAuthorsAndGenresByBookId(request.params.bookId)
    .then(function(book){
      response.render('books/show', {
        book: book
      })
    })
    .catch(function(error){
      response.status(500).send(error)
    })
});

router.get('/:bookId/edit', function(request, response) {

  Promise.all([
    database.getBookWithAuthorsAndGenresByBookId(request.params.bookId),
    database.getAllGenres()
  ])
    .then(function(results){
      const book = results[0]
      const genres = results[1]

      book.genreIds = book.genres.map(genre => genre.id)

      response.render('books/edit', {
        book: book,
        genres: genres,
      })
    })
    .catch(function(error){
      response.status(500).send(error)
    })
})

router.post('/:authorId', function(request, response) {
  const authorId = request.params.authorId
  const attributes = request.body.author
  if (typeof attributes.genres === 'string'){
    attributes.genres = [attributes.genres]
  }
  database.updateAuthor(authorId, attributes)
    .catch(function(error){
      console.error(error);
      response.status(500).render('error', {error: error})
    })
    .then(function(){
      response.redirect('/authors/'+authorId)
    })
})

module.exports = router;
