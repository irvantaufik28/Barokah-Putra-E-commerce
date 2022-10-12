const express = require('express')
const router = express.Router()

const chatController = require('../controllers/chat_controller')

router.get('/', chatController.getChat)




module.exports =router