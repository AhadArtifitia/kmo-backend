const express = require('express')
const router = express.Router()
const { getInstitutions, setInstitution, updateInstitution, deleteInstitution, getInstitution } = require('../controllers/institutionController')
const protect = require('../middlewares/authMiddleware')
const multer = require('multer')
const upload = multer({ dest: "uploads/"})

router.get('/institution', getInstitutions)

router.post('/institution', protect, upload.single("image"), setInstitution)

router.get('/institution/:id', protect, getInstitution)

router.put('/institution/:id', protect, updateInstitution)

router.delete('/institution/:id', protect, deleteInstitution)

module.exports = router