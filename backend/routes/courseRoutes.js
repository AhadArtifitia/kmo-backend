const express = require('express')
const router = express.Router()
const { getCourses, setCourse, updateCourse, deleteCourse } = require('../controllers/courseController')
const protect = require('../middlewares/authMiddleware')

router.get('/course', protect, getCourses)

router.post('/course', protect, setCourse)

router.put('/course/:id', protect, updateCourse)

router.delete('/course/:id', protect, deleteCourse)

module.exports = router