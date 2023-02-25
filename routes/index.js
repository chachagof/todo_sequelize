const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

const home = require('./modules/home')
const user = require('./modules/user')
const todo = require('./modules/todo')

router.use('/users',user)
router.use('/todos', authenticator,todo)
router.use('/', authenticator,home)

module.exports = router