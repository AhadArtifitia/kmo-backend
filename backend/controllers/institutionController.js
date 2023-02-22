const asyncHandler = require('express-async-handler')

// @desc Get Institutions
// @route GET /api/admin/institution
// @access private
const getInstitutions = asyncHandler(async (req,res) => {
    res.status(200).json({message: 'instituitions'})
})

// @desc Set Institution
// @route POST /api/admin/institution
// @access private
const setInstitution = asyncHandler(async(req,res) => {
    if(!req.body.name) {
        res.status(400)
        throw new Error('please add all fields')
    }

    res.status(200).json({message: 'set instituition'})
})

// @desc update Institution
// @route PUT /api/admin/institution/:id
// @access private
const putInstitution = asyncHandler(async(req,res) => {
    res.status(200).json({message:`update instituition ${req.params.id}`})
})

// @desc Delete Institution
// @route DELETE /api/admin/institution/:id
// @access private
const deleteInstitution = asyncHandler(async(req,res) => {
    res.status(200).json({message:`delete instituition ${req.params.id}`})
})

module.exports = {
    getInstitutions,
    setInstitution,
    putInstitution,
    deleteInstitution
}