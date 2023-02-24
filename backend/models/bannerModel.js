const mongoose = require('mongoose')

const bannerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Banner', bannerSchema)