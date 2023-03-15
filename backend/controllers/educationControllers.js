const asyncHandler = require("express-async-handler");
const User = require('../models/userSchema')
const Education = require('../models/educationSchema');
const moment = require("moment/moment");



// @Route /api/education
// @Req POST
const addEducation = asyncHandler(async (req, res) => {
    const { school, degree, field, startDate, endDate, description } = req.body

    if (!school || !degree || !field || !startDate || !endDate) {
        res.status(400)
        throw new Error('Please Provide all required fields')
    }

    const user = await User.findOne({ _id: req.user._id })

    if (user) {
        const formatStr = 'YYYY-MM-DD';
        if (!(moment(startDate, formatStr, true).isValid() && moment(endDate, formatStr, true).isValid())) {
            res.status(400)
            throw new Error("Dates are not Valid")
        }

        if (new Date(startDate) >= new Date(endDate)) {
            res.status(400)
            throw new Error("End date cannot be greater than Start Date")
        }

        const education = await Education.create({
            school, degree, field, startDate, endDate, description
        })

        if (education) {
            user.education.push(education._id)
            await user.save()
            res.json(user)
        }
        else {
            res.status(400)
            throw new Error('Education not created')
        }
    }
    else {
        res.status(400)
        throw new Error('User not found')
    }
})

const removeEducation = asyncHandler(async (req, res) => {
    const { id } = req.params //Education Id
    if (!id) {
        res.status(400)
        throw new Error('No ID')
    }

    const removedEdu = await Education.findByIdAndRemove(id)
    if (removedEdu) {
        const updatedUser = await User.updateOne({ _id: req.user._id }, { $pull: { "education": removedEdu._id } })
        res.json(updatedUser)
    } else {
        res.status(400)
        throw new Error("Cannot delete Education")
    }

})

module.exports = { addEducation, removeEducation }