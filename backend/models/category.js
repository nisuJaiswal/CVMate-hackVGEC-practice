const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    categotyType: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Category', categorySchema)