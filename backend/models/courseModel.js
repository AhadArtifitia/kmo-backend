const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name value']
    },
    level: {
        type: String,
        enum: ['hss', 'bachelors', 'masters'],
    },
    department: {
        type: String,
        required: [true, 'Please add a department value']
    },
    duration: {
        type: String,
        required: [true, 'Please add a duration value']
    },
    fees: {
        type: String,
    },
})

module.exports = mongoose.model('Course', courseSchema)