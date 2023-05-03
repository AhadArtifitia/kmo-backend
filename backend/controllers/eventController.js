const asyncHandler = require('express-async-handler')
const Event = require('../models/eventModel')

require('dotenv').config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const { uploadFile, getFile, deleteFile } = require('../s3')

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

    let result;
    const newImage = req.file
    if(newImage) {
        //delete old image
        const imageUrl = event.imageUrl;
        const objectKey = imageUrl.split(`https://${bucketName}.s3.${region}.amazonaws.com/`)[1];  
        await deleteFile(objectKey)
        
        //add new image
        const file = req.file
        result = await uploadFile(file)

        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, { $set: { title: req.body.title, organizer: req.body.organizer, type: req.body.type, category: req.body.category, description: req.body.description, location: req.body.location, datetime: req.body.datetime, imageUrl: result.Location,} }, { new: true })
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, { $set: { title: req.body.title, organizer: req.body.organizer, type: req.body.type, category: req.body.category, description: req.body.description, location: req.body.location, datetime: req.body.datetime,} }, { new: true })
    // const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })

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

    const imageUrl = event.imageUrl;
    const objectKey = imageUrl.split(`https://${bucketName}.s3.${region}.amazonaws.com/`)[1];  

    await deleteFile(objectKey)

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