const asyncHandler = require('express-async-handler')
const Department = require('../models/departmentModel')

// @desc Get Departments
// @route GET /api/admin/department
// @access private
const getDepartments = asyncHandler(async (req,res) => {
    const departments = await Department.find()

    res.status(200).json( departments )
})

// @desc Set Department
// @route POST /api/admin/department
// @access private
const setDepartment = asyncHandler(async(req,res) => {
    if(!req.body.name) {
        res.status(400)
        throw new Error('please add name value')
    }

    const department = await Department.create({
        name: req.body.name,
        hod: req.body.hod,
        courses: req.body.courses,
        capacity: req.body.capacity
    })

    res.status(200).json(department)
})

// @desc update Department
// @route PUT /api/admin/department/:id
// @access private
const updateDepartment = asyncHandler(async(req,res) => {
    const department = await Department.findById(req.params.id)

    if(!department) {
        res.status(400)
        throw new Error('Department not found')
    }

    const updatedDepartment = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedDepartment)
})

// @desc Delete Department
// @route DELETE /api/admin/department/:id
// @access private
const deleteDepartment = asyncHandler(async(req,res) => {
    const department = await Department.findById(req.params.id)

    if(!department) {
        res.status(400)
        throw new Error('Department not found')
    }

    await department.remove()

    res.status(200).json({ id : req.params.id})
})

module.exports = {
    getDepartments,
    setDepartment,
    updateDepartment,
    deleteDepartment
}
