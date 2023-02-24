const mongoose = require('mongoose')

const institutionSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name value']
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    location: {
        type: String,
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Institution', institutionSchema)