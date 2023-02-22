const express = require('express')
const router = express.Router()
const { getInstitutions, setInstitution, putInstitution, deleteInstitution } = require('../controllers/institutionController')

router.get('/institution', getInstitutions)

router.post('/institution', setInstitution)

router.put('/institution/:id', putInstitution)

router.delete('/institution/:id', deleteInstitution)

module.exports = router