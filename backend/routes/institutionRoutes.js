const express = require('express')
const router = express.Router()
const { getInstitutions, setInstitution, updateInstitution, deleteInstitution } = require('../controllers/institutionController')
const protect = require('../middlewares/authMiddleware')

router.get('/institution', protect, getInstitutions)

router.post('/institution', protect, setInstitution)

router.put('/institution/:id', protect, updateInstitution)

router.delete('/institution/:id', protect, deleteInstitution)

module.exports = router