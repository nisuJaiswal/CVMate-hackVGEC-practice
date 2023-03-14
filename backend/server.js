const express = require('express')
const connectDB = require('./config/connectionDB')
const { errorHandler } = require('./middleware/errorHandler')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 4000
const cors = require('cors')
connectDB()

app.use('/uploadFolder', express.static('backend/uploadFolder'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/user', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`))