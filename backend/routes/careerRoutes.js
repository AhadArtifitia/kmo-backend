const express = require('express')
const router = express.Router()
const { getCareers, setCareer, updateCareer, deleteCareer, getCareer } = require('../controllers/careerController')
const protect = require('../middlewares/authMiddleware')

router.get('/career', getCareers)

router.post('/career', protect, setCareer)

router.get('/career/:id', protect, getCareer)

router.put('/career/:id', protect, updateCareer)

router.delete('/career/:id', protect, deleteCareer)

module.exports = router