const mongoose = require('mongoose')

const careerSchema = mongoose.Schema({
    department: {
        type: String,
        required: [true, 'please add department']
    },
    level: {
        type: String,
        required: [true, 'please add job level']
    },
    type: {
        type: String,
        required: [true, 'please add job type']
    },
    experience: {
        type: String,
        required: [true, 'please add experience']
    },
    updated: {
        type: String,
        required: [true, 'please add updated date']
    } 
})

module.exports = mongoose.model('Career', careerSchema)