'use strict'

const express = require('express')
const router = express.Router()
const database = require('../database')

router.get('/', (request, response) =>  {
  let page = parseInt(request.query.page, 10)
  if (isNaN(page) || page < 1) page = 1
  const searchOptions = {
    search_query: request.query.search_query,
    page: page
  }

  database.searchForBooks(searchOptions)
    .then(books =>  {
      response.render('books/index', {
        books: books,
        page: page
      })
    })
    .catch(error =>  {
      response.render('error', {
        error: error
      })
    })
})

module.exports = router
