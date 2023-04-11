const express = require('express')
const router = express.Router()
const { getGallerys, setGallery, getGallery, updateGallery, deleteGallery } = require('../controllers/galleryController')
const protect = require('../middlewares/authMiddleware')
const multer = require('multer')
const upload = multer({ dest: "uploads/"})

router.get('/gallery', getGallerys)

router.post('/gallery', protect, upload.single("image"), setGallery)

router.get('/gallery/:id', protect, getGallery)

router.put('/gallery/:id', protect, updateGallery)

router.delete('/gallery/:id', protect, deleteGallery)

module.exports = router
