const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title value']
    },
    organizer: {
        type: String,
    },
    type: {
        type: String,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    datetime: {
        type: String
    },
    imageUrl: {
        type: String
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Event', eventSchema)