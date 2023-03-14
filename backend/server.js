const express = require('express')
const connectDB = require('./config/connectionDB')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 4000

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.status(200).json({ success: true, message: "Running Well" }))

app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`))