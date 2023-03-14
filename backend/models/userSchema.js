const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
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
    aboutMe: {
        type: String,
        default: ''
    },
    education: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Education',
            required: true
        }
    }],
    achievements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Achievements"
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    incomingRequest: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

})

module.exports = mongoose.model('User', userSchema)