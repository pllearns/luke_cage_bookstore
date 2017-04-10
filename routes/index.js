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

// TODO: set up the chat service with IBM Watson

  // var prompt = require('prompt-sync')()
  // var ConversationV1 = require('watson-developer-cloud/conversation/v1')
  //
  // var conversation = new ConversationV1({
  //   username: process.env.CHAT_BASE_USERNAME',
  //   password: 'process.env.CHAT_BASE_PASSWORD',
  //   path: {workspace: 'c673c7f3-3e82-4813-b9e3-eb912b33d1d0'},
  //   version_date: '2016-07-11'
  // })

  // conversation.message({}, processResponse)
  //
  // function processResponse(err, response) {
  //   if (err) {
  //     console.error(err)
  //     return
  //   }
  //
  //   if (response.intents.length > 0) {
  //     console.log('Detected intent: #' + response.intents[0].intent)
  //   }
  //
  //   if (response.output.text != 0) {
  //     console.log(response.output.text[0])
  //   }
  //
  //   var newMessageFromUser = prompt('>> ')
  //   conversation.message({
  //     input: { text: newMessageFromUser }
  //   }, processResponse)
  // }

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
