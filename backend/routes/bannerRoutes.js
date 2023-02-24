const express = require('express')
const router = express.Router()
const { setBanner } = require('../controllers/bannerController')
const protect = require('../middlewares/authMiddleware')

router.post('/banner', protect, setBanner)

module.exports = router