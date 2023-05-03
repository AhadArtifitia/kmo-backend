const asyncHandler = require("express-async-handler");
const Alumni = require('../models/alumniModel')

require('dotenv').config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const { uploadFile, getFile, deleteFile } = require('../s3')

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

    let result;
    const newImage = req.file
    if(newImage) {
        //delete old image
        const imageUrl = alumni.imageUrl;
        const objectKey = imageUrl.split(`https://${bucketName}.s3.${region}.amazonaws.com/`)[1];  
        await deleteFile(objectKey)
        
        //add new image
        const file = req.file
        result = await uploadFile(file)

        const updatedAlumni = await Alumni.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, description: req.body.description, imageUrl: result.Location,} }, { new: true })
    }

    const updatedAlumni = await Alumni.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, description: req.body.description, } }, { new: true })
    //const updatedAlumni = await Alumni.findByIdAndUpdate(req.params.id, req.body, { new: true })

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

    const imageUrl = alumni.imageUrl;
    const objectKey = imageUrl.split(`https://${bucketName}.s3.${region}.amazonaws.com/`)[1];  

    await deleteFile(objectKey)
    
    await alumni.remove()

    res.status(200).json({ id : req.params.id })
})

module.exports = {
    getAlumnis,
    setAlumni,
    getAlumni,
    updateAlumni,
    deleteAlumni
}