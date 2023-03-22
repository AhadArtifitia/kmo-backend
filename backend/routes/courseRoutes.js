const express = require('express')
const router = express.Router()
const { getCourses, setCourse, getCourse, updateCourse, deleteCourse } = require('../controllers/courseController')
const protect = require('../middlewares/authMiddleware')

router.get('/course', getCourses)

router.post('/course', protect, setCourse)

router.get('/course/:id', protect, getCourse)

router.put('/course/:id', protect, updateCourse)

router.delete('/course/:id', protect, deleteCourse)

module.exports = router