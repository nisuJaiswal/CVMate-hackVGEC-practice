const mongoose = require('mongoose')

const achievementsScema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    catagory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    certificate: {
        type: String
    },
    reqToFaculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    issuedOrganization: {
        type: String
    },
    issueDate: {
        type: Date
    },
    status: {
        type: String,
        default: 'pending'
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        // required: true
    },
    reviews: [{
        facultyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Faculty',
            required: true
        },
        message: {
            type: String,
        },
        rating: {
            type: Number,
            enum: [1, 2, 3, 4, 5]
        }
    }]
})

module.exports = mongoose.model('Achievements', achievementsScema)