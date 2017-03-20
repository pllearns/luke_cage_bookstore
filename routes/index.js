'use strict'

const express = require('express')
const router = express.Router()
const database = require('../database')

router.get('/', function(request, response) {
  let page = parseInt(request.query.page, 10)
  if (isNan(page) || page < 1) page = 1
  const searchOptions = {
    search_query: req.query.search_query,
    page: page
  }

  database.searchForBooks(searchOptions)
    .then(function(books) {
      response.render('books/index', {
        books: books,
        page: page
      })
    })
    .catch(function(error) {
      response.render('error', {
        error: error
      })
    })
})

module.exports = router
