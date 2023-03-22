const mongoose = require('mongoose')

const bannerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    }
})

module.exports = mongoose.model('Banner', bannerSchema)