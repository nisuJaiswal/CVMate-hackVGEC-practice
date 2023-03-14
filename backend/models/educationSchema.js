const mongoose = require('mongoose')

const educationSchema = mongoose.Schema({

    school: {
        type: String
    },
    degree: {
        type: String
    },
    field: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    description: {
        type: String
    }

})


module.exports = mongoose.model('Education', educationSchema)