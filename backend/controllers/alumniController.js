const asyncHandler = require("express-async-handler");
const Alumni = require('../models/alumniModel')

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const { uploadFile, getFile } = require('../s3')

//@desc Get banners
//@route GET /api/admin/banner
//@access private
const getAlumnis = asyncHandler(async (req,res) => {
    const alumni = await Alumni.find()

    res.status(200).json(alumni)
})

// @desc Set Institution
// @route POST /api/admin/institution
// @access private
const setAlumni = asyncHandler(async(req,res) => {
    if(!req.body.name) {
        res.status(400)
        throw new Error('please add name field')
    }

    const file = req.file
    const result = await uploadFile(file)
    const alumni = await Alumni.create({
        name: req.body.name,
        description: req.body.description,
        imageUrl: result.Location
    })

    await unlinkFile(file.path)

    res.status(200).json(alumni)
})

// @desc Get single Institution
// @route GET /api/admin/institution/:id
// @access private
const getAlumni = asyncHandler(async (req,res) => {
    const alumni = await Alumni.findById(req.params.id)

    if(!alumni) {
        res.status(400)
        throw new Error('Alumni not found')
    }

    res.status(200).json( alumni )
})

// @desc update Institution
// @route PUT /api/admin/institution/:id
// @access private
const updateAlumni = asyncHandler(async(req,res) => {
    const alumni = await Alumni.findById(req.params.id)

    if(!alumni) {
        res.status(400)
        throw new Error('Alumni not found')
    }

    const updatedAlumni = await Alumni.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedAlumni)
})

// @desc Delete Institution
// @route DELETE /api/admin/institution/:id
// @access private
const deleteAlumni = asyncHandler(async(req,res) => {
    const alumni = await Alumni.findById(req.params.id)

    if(!alumni) {
        res.status(400)
        throw new Error('Alumni not found')
    }

    await alumni.remove()


    res.status(200).json({ id : req.params.id})
})

module.exports = {
    getAlumnis,
    setAlumni,
    getAlumni,
    updateAlumni,
    deleteAlumni
}