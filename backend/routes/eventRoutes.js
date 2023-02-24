const express = require('express')
const router = express.Router()
const { getEvents, setEvent, updateEvent, deleteEvent } = require('../controllers/eventController')
const protect = require('../middlewares/authMiddleware')

router.get('/event', protect, getEvents)

router.post('/event', protect, setEvent)

router.put('/event/:id', protect, updateEvent)

router.delete('/event/:id', protect, deleteEvent)

module.exports = router