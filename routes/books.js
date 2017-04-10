'use strict'

const express = require('express')
const router = express.Router()
const database = require('../database')

router.get('/', (request, response, next) => {
  response.redirect('/')
})

router.get('/new', (request, response) => {
  database.getAllGenres()
    .then(function(genres){
      response.render('books/new',{
        genres: genres
    })
  })
})

router.post('/new', (request, response) => {
  database.createBook(request.body.book)
    .then(book => {
      response.redirect('/books/'+book.id)
    })
    .catch(error => {
      response.status(500).send(error)
    })
})

router.get('/:bookId', (request, response) => {
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

router.post('/:bookId', (request, response) => {
  const bookId = request.params.bookId
  const attributes = request.body.book
  if (typeof attributes.genres === 'string'){
    attributes.genres = [attributes.genres]
  }
  database.updateBook(bookId, attributes)
    .catch(error => {
      response.status(500).render('error', {error: error})
    })
    .then(() => {
      response.redirect('/books/'+bookId)
  })
})


module.exports = router
