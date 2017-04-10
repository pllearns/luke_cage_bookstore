const express = require('express')
const router = express.Router()
const database = require('../database')

router.post('/', (request, response) => {
  database.createAuthor(request.body.author)
    .catch(error => {
      response.status(500).send(error)
    })
    .then(author => {
      response.redirect('/authors/'+author.id)
    })
})


router.get('/:bookId', function(request, response) {
  database.getBookWithAuthorsAndGenresByBookId(request.params.bookId)
    .then(book => {
      response.render('books/show', {
        book: book
      })
    })
    .catch(error => {
      response.status(500).send(error)
    })
})

router.get('/:bookId/edit', (request, response) => {
  Promise.all([
    database.getBookWithAuthorsAndGenresByBookId(request.params.bookId),
    database.getAllGenres()
  ])
    .then(results => {
      const book = results[0]
      const genres = results[1]

      book.genreIds = book.genres.map(genre => genre.id)

      response.render('books/edit', {
        book: book,
        genres: genres,
      })
    })
    .catch(error => {
      response.status(500).send(error)
    })
})

router.post('/:authorId', (request, response) => {
  const authorId = request.params.authorId
  const attributes = request.body.author
  if (typeof attributes.genres === 'string'){
    attributes.genres = [attributes.genres]
  }
  database.updateAuthor(authorId, attributes)
    .catch(error => {
      console.error(error)
      response.status(500).render('error', {error: error})
    })
    .then(() => {
      response.redirect('/authors/'+authorId)
    })
})

module.exports = router
