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

// @Route /api/education/:id
// @Rew DELETE
const removeEducation = asyncHandler(async (req, res) => {
    const { id } = req.params //Education Id
    if (!id) {
        res.status(400)
        throw new Error('No ID')
    }

    const removedEdu = await Education.findByIdAndRemove({ _id: id })

    if (removedEdu) {
        const updatedUser = await User.updateOne({ _id: req.user._id }, { $pull: { "education": removedEdu._id } })
        if (updatedUser) {
            // await updatedUser.save()
            res.json({ success: true, message: "Education Removed Successfully" })
        } else {
            res.status(400)
            throw new Error('User cannot be updated')
        }
    } else {
        res.status(400)
        throw new Error("Education not found")
    }

})

// @Route /api/education/:id
// @Req PUT
const editEducation = asyncHandler(async (req, res) => {
    const { school, degree, field, startDate, endDate, description } = req.body
    const { id } = req.params

    const formatStr = 'YYYY-MM-DD';
    if (!(moment(startDate, formatStr, true).isValid() && moment(endDate, formatStr, true).isValid())) {
        res.status(400)
        throw new Error("Dates are not Valid")
    }

    if (new Date(startDate) >= new Date(endDate)) {
        res.status(400)
        throw new Error("End date cannot be greater than Start Date")
    }

    const foundEducation = await Education.findOne({ _id: id })
    if (!foundEducation) {
        res.status(400)
        throw new Error("Education not found")
    }

    const education = await Education.updateOne({ _id: id }, {
        school, degree, field, startDate, endDate, description
    })

    if (education.modifiedCount === 1 && education.acknowledged) {
        res.status(200).json({ success: true, message: "Education Updated Successfully" })
    } else {
        // res.status(400).json({ success: false, message: "New Education seems to be same as Older one" })
        res.status(400)
        throw new Error('New Education seems to be same as Older one')
    }

})

module.exports = { addEducation, removeEducation, editEducation }