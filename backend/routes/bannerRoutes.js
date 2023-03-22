const express = require('express')
const router = express.Router()
const { setBanner, getBanners, deleteBanner } = require('../controllers/bannerController')
const protect = require('../middlewares/authMiddleware')
const multer = require('multer')
const upload = multer({ dest: "uploads/"})

router.get('/banner',  getBanners)

router.post('/banner', protect, upload.single("image"), setBanner)

router.delete('/banner/:id', protect, deleteBanner)

module.exports = router