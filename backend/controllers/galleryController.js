const asyncHandler = require('express-async-handler')
const Gallery = require('../models/galleryModel')

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const { uploadFile, getFile } = require('../s3')

// @desc Get Gallerys
// @route GET /api/admin/gallery
// @access private
const getGallerys = asyncHandler(async (req,res) => {
    const gallerys = await Gallery.find()

    res.status(200).json( gallerys )
})

// @desc Set Gallery
// @route POST /api/admin/gallery
// @access private
const setGallery = asyncHandler(async(req,res) => {
    if(!req.file) {
        res.status(400)
        throw new Error('please add a file')
    }

    const file = req.file
    const result = await uploadFile(file)
    const gallery = await Gallery.create({
        name: req.body.name,
        imageUrl: result.Location
    })

    await unlinkFile(file.path)

    res.status(200).json(gallery)
})

// @desc Get single Gallery
// @route GET /api/admin/gallery/:id
// @access private
const getGallery = asyncHandler(async (req,res) => {
    const gallery = await Gallery.findById(req.params.id)

    if(!gallery) {
        res.status(400)
        throw new Error('File not found')
    }

    res.status(200).json( gallery )
})

// @desc update Gallery
// @route PUT /api/admin/gallery/:id
// @access private
const updateGallery = asyncHandler(async(req,res) => {
    const gallery = await Gallery.findById(req.params.id)

    if(!gallery) {
        res.status(400)
        throw new Error('file not found')
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedGallery)
})

// @desc Delete Gallery
// @route DELETE /api/admin/gallery/:id
// @access private
const deleteGallery = asyncHandler(async(req,res) => {
    const gallery = await Gallery.findById(req.params.id)

    if(!gallery) {
        res.status(400)
        throw new Error('file not found')
    }

    await gallery.remove()


    res.status(200).json({ id : req.params.id})
})

module.exports = {
    getGallerys,
    setGallery,
    getGallery,
    updateGallery,
    deleteGallery
}