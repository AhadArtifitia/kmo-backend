const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middlewares/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 3000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/admin', require('./routes/loginRoutes'))
app.use('/api/admin', require('./routes/institutionRoutes'))
app.use('/api/admin', require('./routes/departmentRoutes'))
app.use('/api/admin', require('./routes/courseRoutes'))
app.use('/api/admin', require('./routes/careerRoutes'))
app.use('/api/admin', require('./routes/eventRoutes'))
app.use('/api/admin', require('./routes/bannerRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`))