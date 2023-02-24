const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')

// @desc Register admin
// @route POST /api/admin/register
// @access admin
const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if(!email || !password) {
        res.status(400)
        throw new Error('email and password value is compulsory')
    }

    //check if admin exists
    const adminExist = await Admin.findOne({ email })

    if(adminExist) {
        res.status(400)
        throw new Error('admin already exist')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create admin
    const admin = await Admin.create({
        name,
        email,
        password: hashedPassword
    })

    if(admin) {
        res.status(201).json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})

// @desc Admin Login
// @route POST /api/admin/login
// @access admin
const authenticate = asyncHandler(async (req,res) => {
    const { email, password } = req.body

    //check for admin email
    const admin = await Admin.findOne({ email })

    if(admin && (await bcrypt.compare(password, admin.password)) ) {
        res.status(200).json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id),
            message: 'admin dashboard'
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//generate jwt
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '9h' })
}

module.exports = {
    authenticate,
    registerAdmin
}