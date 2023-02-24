const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'please add an email value'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please add a password value']
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Admin', adminSchema)