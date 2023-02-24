const asyncHandler = require('express-async-handler')
const Career = require('../models/careerModel')

//@desc Get careers
//@route GET /api/admin/career
//@access private
const getCareers = asyncHandler(async (req,res) => {
    const careers = await Career.find()

    res.status(200).json(careers)
})

//@desc Set course
//@route POST /api/admin/course
//@access private
const setCareer = asyncHandler(async (req,res) => {
    if(!req.body.department) {
        res.status(400)
        throw new Error('Please add department value')
    }

    const career = await Career.create({
        department: req.body.department,
        level: req.body.level,
        type: req.body.type,
        experience: req.body.experience,
        updated: req.body.updated
    })

    res.status(200).json(career)
})

//@desc Update course
//@route PUT /api/admin/course/:id
//@access private
const updateCareer = asyncHandler(async (req,res) => {
    const career = await Career.findById(req.params.id)

    if(!career) {
        res.status(400)
        throw new Error('Career not found')
    }

    const updatedCareer = await Career.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedCareer)
})

//@desc Delete course
//@route DELETE /api/admin/course/:id
//@access private
const deleteCareer = asyncHandler(async (req,res) => {
    const career = await Career.findById(req.params.id)

    if(!career) {
        res.status(400)
        throw new Error('Career not found')
    }

    await career.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getCareers,
    setCareer,
    updateCareer,
    deleteCareer
}