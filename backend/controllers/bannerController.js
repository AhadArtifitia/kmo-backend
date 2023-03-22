const asyncHandler = require("express-async-handler");
const Banner = require('../models/bannerModel')

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const { uploadFile, getFile } = require('../s3')

//@desc Get banners
//@route GET /api/admin/banner
//@access private
const getBanners = asyncHandler(async (req,res) => {
    const banners = await Banner.find()

    res.status(200).json(banners)
})

//@desc Set banner
//@route POST /api/admin/banner
//@access private
const setBanner = asyncHandler(async(req,res) => {

    const file = req.file
    const result = await uploadFile(file)
    const banner = await Banner.create({
        name: req.body.name,
        imageUrl: result.Location
    })

    await unlinkFile(file.path)

    res.status(200).json(banner)
})

//@desc Delete course
//@route DELETE /api/admin/course/:id
//@access private
const deleteBanner = asyncHandler(async (req,res) => {
    const banner = await Banner.findById(req.params.id)

    if(!banner) {
        res.status(400)
        throw new Error('Banner not found')
    }

    await banner.remove()

    res.status(200).json({ id: req.params.id })

    
})

module.exports = {
    getBanners,
    setBanner,
    deleteBanner
}