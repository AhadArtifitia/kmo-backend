const mongoose = require('mongoose')

const departmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name value']
    },
    hod: {
        type: String,
    },
    courses: {
        type: String,
    },
    capacity: {
        type: Number,
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Department', departmentSchema)