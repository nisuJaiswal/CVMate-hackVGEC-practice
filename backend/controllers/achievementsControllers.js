const asyncHandler = require("express-async-handler");
const Achievements = require('../models/achievementsSchema')
const formidable = require('formidable')
const moment = require("moment/moment");
const fs = require('fs')
const path = require('path')

let upload_path = path.join(__dirname, "../uploadFolder/");
const addAchievements = asyncHandler(async (req, res) => {

    const form = formidable();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }

        // All the other data like req.body stored in fields, so use fields for access req.body

        const { category, reqToFaculty, issuedOrganization, issueDate } = fields
        // const { username, password, firstName, lastName, aboutMe } = fields
        if (!category || !reqToFaculty || !issuedOrganization || !issueDate || !files.certificate || !category) {

            res.status(400)
            res.json({ err: "Please Provide All Required Fileds" })
            return
        }

        const formatStr = 'YYYY-MM-DD';
        if (!(moment(issueDate, formatStr, true).isValid())) {
            res.status(400)
            res.json({ err: "Dates are not Valid" })
            return
        }
        // oldpath shows the original path of file
        var oldpath = files.certificate.filepath;
        // newpath indicates new path, which is absolute path, not usefull as well
        var newpath =
            upload_path +
            new Date().getTime() +
            path.extname
                (files.certificate.originalFilename);

        //newName indicates the new name which is stored in timestamp.extension format
        let newName =
            new Date().getTime() + path.extname(files.certificate.originalFilename);

        // rename stores the file in newpath i.e. in uploadedFolder
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw new Error(err);
        });

        try {
            const achievement = await Achievements.create({
                user: req.user._id,
                catagory: category, certificate: newName, reqToFaculty, issuedOrganization, issueDate
            })
            // const fac = await Faculty.updateOne({id: reqToFaculty}, achievementsToVerify.push(achievement._id))
            res.json(achievement)
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

})

module.exports = { addAchievements }