const User = require('../models/userSchema')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const path = require('path');
const jwt = require('jsonwebtoken')
const formidable = require('formidable');
const fs = require('fs')


// @Route /api/user
// @Req POST

let upload_path = path.join(__dirname, "../uploadFolder/");
const registerUser = asyncHandler(async (req, res) => {


    const form = formidable();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }

        // All the other data like req.body stored in fields, so use fields for access req.body

        const { username, password, firstName, lastName, aboutMe } = fields
        if (!username || !password || !firstName || !lastName) {

            res.status(400)
            res.json({ err: "Please Provide All Required Fileds" })
            return
        }

        // Checking for existing User
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            res.status(400)
            res.json({ err: "User Already Exists" })
            return
        }

        // Hashing Password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)

        // Operation to perform if no any file uploaded
        if (!files.uploadFile) {
            try {
                const user = await User.create({
                    // Set Other Data in db
                    username,
                    password: hashedpassword,
                    firstName,
                    lastName,
                    imageUrl: "default.jpg",
                    aboutMe,
                });
                res.json({
                    user,
                    token: generateToken(user._id)
                });
            } catch (error) {
                res.status(400).json({ err: error.message })
                    ;
            }
            return;
        }

        // oldpath shows the original path of file
        var oldpath = files.uploadFile.filepath;
        // newpath indicates new path, which is absolute path, not usefull as well
        var newpath =
            upload_path +
            new Date().getTime() +
            path.extname
                (files.uploadFile.originalFilename);

        //newName indicates the new name which is stored in timestamp.extension format
        let newName =
            new Date().getTime() + path.extname(files.uploadFile.originalFilename);

        // rename stores the file in newpath i.e. in uploadedFolder
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw new Error(err);
        });
        try {
            const user = await User.create({
                // Set Other Data in Db
                username,
                password: hashedpassword,
                firstName,
                lastName,
                aboutMe,
                imageUrl: newName,
            });
            res.json({
                user, token: generateToken(user._id)
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
})

// @Route /api/user/login
// @Req POST
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(400)
        throw new Error('Please Provide All the fields')
    }

    const user = await User.findOne({ username })
    if (!user) {
        res.status(400)
        throw new Error("User not found")
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({ user, token: generateToken(user._id) })
    } else {
        res.status(400)
        throw new Error("Invalid Credentials")
    }
})

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JSON_SECRET, { expiresIn: '1d' })
}
module.exports = { registerUser, loginUser }