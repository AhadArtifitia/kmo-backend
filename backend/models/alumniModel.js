const mongoose = require('mongoose')

const alumniSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Alumni', alumniSchema)