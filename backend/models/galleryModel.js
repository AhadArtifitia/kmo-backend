const mongoose = require('mongoose')

const gallerySchema = mongoose.Schema({
    name: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: [true, 'image url required']
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Gallery', gallerySchema)