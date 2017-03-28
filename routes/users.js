'use strict'

const express = require('express')
const router = express.Router()

router.get('/', (request, response, next) => {
  response.send('respond with a resource')
})

module.exports = router
