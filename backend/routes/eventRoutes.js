const express = require('express')
const router = express.Router()
const { getEvents, setEvent, updateEvent, deleteEvent, getEvent } = require('../controllers/eventController')
const protect = require('../middlewares/authMiddleware')

router.get('/event', protect, getEvents)

router.post('/event', protect, setEvent)

router.get('/event/:id', protect, getEvent)

router.put('/event/:id', protect, updateEvent)

router.delete('/event/:id', protect, deleteEvent)

module.exports = router