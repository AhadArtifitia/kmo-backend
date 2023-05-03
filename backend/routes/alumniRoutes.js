const express = require('express')
const router = express.Router()
const { getAlumnis, setAlumni, getAlumni, updateAlumni, deleteAlumni } = require('../controllers/alumniController')
const protect = require('../middlewares/authMiddleware')
const multer = require('multer')
const upload = multer({ dest: "uploads/"})

router.get('/alumni',  getAlumnis)

router.post('/alumni', protect, upload.single("image"), setAlumni)

router.get('/alumni/:id', protect, getAlumni)

router.put('/alumni/:id', protect, upload.single("image"), updateAlumni)

router.delete('/alumni/:id', protect, deleteAlumni)

module.exports = router
