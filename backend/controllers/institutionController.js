const asyncHandler = require('express-async-handler')
const Institution = require('../models/institutionModel')

require('dotenv').config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const { uploadFile, getFile, deleteFile } = require('../s3')

// @desc Get Institutions
// @route GET /api/admin/institution
// @access private
const getInstitutions = asyncHandler(async (req,res) => {
    const institutions = await Institution.find()

    res.status(200).json( institutions )
})

// @desc Set Institution
// @route POST /api/admin/institution
// @access private
const setInstitution = asyncHandler(async(req,res) => {
    if(!req.body.name) {
        res.status(400)
        throw new Error('please add name field')
    }

    const file = req.file
    const result = await uploadFile(file)
    const instituition = await Institution.create({
        name: req.body.name,
        description: req.body.description,
        phone: req.body.phone,
        email: req.body.email,
        location: req.body.location,
        imageUrl: result.Location
    })

    await unlinkFile(file.path)

    res.status(200).json(instituition)
})

// @desc Get single Institution
// @route GET /api/admin/institution/:id
// @access private
const getInstitution = asyncHandler(async (req,res) => {
    const institution = await Institution.findById(req.params.id)

    if(!institution) {
        res.status(400)
        throw new Error('Institution not found')
    }

    res.status(200).json( institution )
})

// @desc update Institution
// @route PUT /api/admin/institution/:id
// @access private
const updateInstitution = asyncHandler(async(req,res) => {
    const institution = await Institution.findById(req.params.id)

    if(!institution) {
        res.status(400)
        throw new Error('Institution not found')
    }

    let result;
    const newImage = req.file
    if(newImage) {
        //delete old image
        const imageUrl = institution.imageUrl;
        const objectKey = imageUrl.split(`https://${bucketName}.s3.${region}.amazonaws.com/`)[1];  
        await deleteFile(objectKey)
        
        //add new image
        const file = req.file
        result = await uploadFile(file)

        const updatedInstitution = await Institution.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, description: req.body.description, phone: req.body.phone, email: req.body.email, location: req.body.location, imageUrl: result.Location,} }, { new: true })
    }

    const updatedInstitution = await Institution.findByIdAndUpdate(req.params.id, { $set: {name: req.body.name, description: req.body.description, phone: req.body.phone, email: req.body.email, location: req.body.location,} }, { new: true })

    res.status(200).json(updatedInstitution)
})

// @desc Delete Institution
// @route DELETE /api/admin/institution/:id
// @access private
const deleteInstitution = asyncHandler(async(req,res) => {
    const institution = await Institution.findById(req.params.id)

    if(!institution) {
        res.status(400)
        throw new Error('Institution not found')
    }

    const imageUrl = institution.imageUrl;
    const objectKey = imageUrl.split(`https://${bucketName}.s3.${region}.amazonaws.com/`)[1];  

    await deleteFile(objectKey)

    await institution.remove()


    res.status(200).json({ id : req.params.id})
})

module.exports = {
    getInstitutions,
    setInstitution,
    getInstitution,
    updateInstitution,
    deleteInstitution
}