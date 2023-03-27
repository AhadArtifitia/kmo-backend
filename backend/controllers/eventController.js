const asyncHandler = require('express-async-handler')
const Event = require('../models/eventModel')

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const { uploadFile, getFile } = require('../s3')

// @desc Get Events
// @route GET /api/admin/event
// @access private
const getEvents = asyncHandler(async (req,res) => {
    const events = await Event.find()

    res.status(200).json(events)
})

// @desc Set Event
// @route POST /api/admin/event
// @access private
const setEvent = asyncHandler(async(req,res) => {
    if(!req.body.title) {
        res.status(400)
        throw new Error('please add title field')
    }

    const file = req.file
    const result = await uploadFile(file)
    const event = await Event.create({
        title: req.body.title,
        organizer: req.body.organizer,
        type: req.body.type,
        category: req.body.category,
        description: req.body.description,
        location: req.body.location,
        datetime: req.body.datetime,
        imageUrl: result.Location
    })

    await unlinkFile(file.path)

    res.status(200).json(event)
})

// @desc Get Event
// @route GET /api/admin/event/:id
// @access private
const getEvent = asyncHandler(async (req,res) => {
    const event = await Event.findById(req.params.id)
    if(!event) {
        res.status(400)
        throw new Error('Event not found')
    }

    res.status(200).json(event)
})

// @desc update Event
// @route PUT /api/admin/event/:id
// @access private
const updateEvent = asyncHandler(async(req,res) => {
    const event = await Event.findById(req.params.id)

    if(!event) {
        res.status(400)
        throw new Error('Event not found')
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedEvent)
})

// @desc Delete Institution
// @route DELETE /api/admin/institution/:id
// @access private
const deleteEvent = asyncHandler(async(req,res) => {
    const event = await Event.findById(req.params.id)

    if(!event) {
        res.status(400)
        throw new Error('Event not found')
    }

    await event.remove()

    res.status(200).json({id : req.params.id})
})

module.exports = {
    getEvents,
    setEvent,
    getEvent,
    updateEvent,
    deleteEvent
}