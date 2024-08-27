const express = require('express')
const {signUp, verifyOtp} = require('../controllers/authController')

const router = express.Router()

router.route('/signup').post(signUp)
router.route('/verify').post(verifyOtp)

module.exports = router