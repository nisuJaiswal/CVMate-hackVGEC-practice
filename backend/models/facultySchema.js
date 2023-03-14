const mongoose = require('mongoose')

const facultySchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please Provide Username']
    },
    password: {
        type: String,
        required: [true, 'Please Provide Password']
    },
    firstName: {
        type: String,
        required: [true, 'Please Provide FirstName']
    },
    lastName: {
        type: String,
        required: [true, 'Please Provide LastName']
    },
    imageUrl: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    achievementsToVerify: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Achievements'
    }
})

module.exports = mongoose.model("Faculty", facultySchema)