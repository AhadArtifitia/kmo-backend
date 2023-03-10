const asyncHandler = require('express-async-handler')
const Course = require('../models/courseModel')

//@desc Get courses
//@route GET /api/admin/course
//@access private
const getCourses = asyncHandler(async (req,res) => {
    const courses = await Course.find()

    res.status(200).json(courses)
})

//@desc Set course
//@route POST /api/admin/course
//@access private
const setCourse = asyncHandler(async (req,res) => {
    if(!req.body.name) {
        res.status(400)
        throw new Error('Please add name value')
    }

    const course = await Course.create({
        name: req.body.name,
        department: req.body.department,
        duration: req.body.duration,
        fees: req.body.fees
    })

    res.status(200).json(course)
})

//@desc Get course
//@route GET /api/admin/course/:id
//@access private
const getCourse = asyncHandler(async (req,res) => {
    const course = await Course.findById(req.params.id)

    if(!course) {
        res.status(400)
        throw new Error('Course not found')
    }

    res.status(200).json(course)
})

//@desc Update course
//@route PUT /api/admin/course/:id
//@access private
const updateCourse = asyncHandler(async (req,res) => {
    const course = await Course.findById(req.params.id)

    if(!course) {
        res.status(400)
        throw new Error('Course not found')
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedCourse)
})

//@desc Delete course
//@route DELETE /api/admin/course/:id
//@access private
const deleteCourse = asyncHandler(async (req,res) => {
    const course = await Course.findById(req.params.id)

    if(!course) {
        res.status(400)
        throw new Error('Course not found')
    }

    await course.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getCourses,
    setCourse,
    getCourse,
    updateCourse,
    deleteCourse
}