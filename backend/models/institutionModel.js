const mongoose = require('mongoose')

const institutionSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name value']
    },
    description: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    location: {
        type: String,
    },
    imageUrl: {
        type: String,
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Institution', institutionSchema)