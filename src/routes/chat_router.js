const express = require('express')
const router = express.Router()
const authorized = require('../middleware/socket_io')
const chatController = require('../controllers/chat_controller')

router.get('/',authorized, chatController.getChat)




module.exports =router