const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const cn = await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to the Database")
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB