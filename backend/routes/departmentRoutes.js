const express = require('express')
const router = express.Router()
const { getDepartments, setDepartment, updateDepartment, deleteDepartment } = require('../controllers/departmentController')
const protect = require('../middlewares/authMiddleware')

router.get('/department', protect, getDepartments)

router.post('/department', protect, setDepartment)

router.put('/department/:id', protect, updateDepartment)

router.delete('/department/:id', protect, deleteDepartment)

module.exports = router