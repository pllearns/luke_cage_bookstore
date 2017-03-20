'use strict'

const express = require('express')
const router = express.Router()
const database = require('../database')

router.get('/', function(request, response, next){
  response.redirect('/')
})

router.get('/new', function(request, response) {
  database.getAllGenres()
    .then(function(genres){
      response.render('books/new',{
        genres: genres
      })
    })
})

router.post('/', function(request, response) {
  database.createBook(request.body.book)
    .catch(function(error){
      response.status(500).send(error)
    })
    .then(function(book){
      response.redirect('/books/'+book.id)
    })
})

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
})

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

router.post('/:bookId', function(request, response) {
  const bookId = request.params.bookId
  const attributes = request.body.book
  if (typeof attributes.genres === 'string'){
    attributes.genres = [attributes.genres]
  }
  database.updateBook(bookId, attributes)
    .catch(function(error){
      response.status(500).render('error', {error: error})
    })
    .then(function(){
      response.redirect('/books/'+bookId)
    })
})


module.exports = router
