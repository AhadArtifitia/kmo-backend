const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middlewares/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')
const bodyParser = require('body-parser')

const port = process.env.PORT || 8000

connectDB()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())
app.use(express.json())

app.use('/api/admin', require('./routes/loginRoutes'))
app.use('/api/admin', require('./routes/institutionRoutes'))
app.use('/api/admin', require('./routes/departmentRoutes'))
app.use('/api/admin', require('./routes/courseRoutes'))
app.use('/api/admin', require('./routes/careerRoutes'))
app.use('/api/admin', require('./routes/eventRoutes'))
app.use('/api/admin', require('./routes/bannerRoutes'))
app.use('/api/admin', require('./routes/alumniRoutes'))
app.use('/api/admin', require('./routes/galleryRoutes'))

app.use(require('./routes/contactRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`))