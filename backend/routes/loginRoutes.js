const express = require('express')
const router = express.Router()
const { authenticate, registerAdmin } = require('../controllers/loginController')

// router.post('/register', registerAdmin)

router.post('/login', authenticate)

module.exports = router