const express = require('express')
const router = express.Router()

const otpController = require('../controllers/otp_controller')

router.get('/verify', otpController.verifyOTP)
router.post('/request', otpController.generateOTP)




module.exports =router