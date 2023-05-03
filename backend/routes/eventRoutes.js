const express = require('express')
const router = express.Router()
const { getEvents, setEvent, updateEvent, deleteEvent, getEvent } = require('../controllers/eventController')
const protect = require('../middlewares/authMiddleware')
const multer = require('multer')
const upload = multer({ dest: "uploads/"})

router.get('/event', getEvents)

router.post('/event', protect, upload.single("image"), setEvent)

router.get('/event/:id', protect, getEvent)

router.put('/event/:id', protect, upload.single("image"), updateEvent)

router.delete('/event/:id', protect, deleteEvent)

module.exports = router