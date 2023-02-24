const asyncHandler = require("express-async-handler");
const Banner = require('../models/bannerModel')
const multer = require('multer')

// storage 
const Storage = multer.diskStorage({
    destination: 'bannerImages',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload =  multer({
    storage: Storage
}).single('testImages')

//@desc Set banner
//@route POST /api/admin/banner
//@access private
const setBanner =  (req,res) => {
    upload (req, res, (err) => {
        if(err) {
            console.log(err);
        } else {
            const banner = new Banner({
                name: req.body.name,
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                }
            })
            banner.save()
            .then( ()=> res.send("successfully uploaded") )
            .catch(err => console.log(err))
        }
    })
}

module.exports = {
    setBanner
}