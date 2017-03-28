const express = require('express')
const router = express.Router()
const database = require('../database')

router.post('/add', (request, response) => {
  const title = request.body
  database.addBook(title)
    .then(books => {
      response.render('../views/books/show', {
        books: books
      })
    })
    .catch(error =>  {
      throw error
    })
})

module.exports = router
