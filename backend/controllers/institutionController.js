const asyncHandler = require('express-async-handler')
const Institution = require('../models/institutionModel')

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
        throw new Error('please add all fields')
    }

    const instituition = await Institution.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        location: req.body.location
    })

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

    const updatedInstitution = await Institution.findByIdAndUpdate(req.params.id, req.body, { new: true })

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