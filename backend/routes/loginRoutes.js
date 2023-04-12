const express = require('express')
const router = express.Router()
const { authenticate, registerAdmin } = require('../controllers/loginController')

// router.post('/register', registerAdmin)

router.get('/login', (req,res)=> {
    res.status(200).json({message:'enter login credentials'})
})

router.post('/login', authenticate)

module.exports = router