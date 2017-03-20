const express = require('express')
const router = express.Router()
const database = require('../database')

router.post('/add', (request, response) => {
  const title = request.body
  database.addBook(title)
    .then(function(books) {
      response.render('../views/books/show', {
        books: books
      })
    })
    .catch(function(error) {
      throw error
    })
})

module.exports = router
