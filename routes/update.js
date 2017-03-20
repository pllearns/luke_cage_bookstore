const express = require('express')
const router = express.Router()
const database = require('../database')

router.put('/books/:book.id', (request, response) => {
  const title = request.body
  database.updateBook(request.params.bookId)
    .then(function(book) {
      response.render('../views/books/show', {
        book: book
      })
    })
    .catch(function(error) {
      response.status(500).send(error)
    })
})

module.exports = router
