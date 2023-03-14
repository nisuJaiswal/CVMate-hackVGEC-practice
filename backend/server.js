const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.status(200).json({ success: true, message: "Running Well" }))

app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`))