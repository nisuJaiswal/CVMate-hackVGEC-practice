const { registerUser } = require('../controllers/userControllers')

const router = require('express').Router()

router.post('/', registerUser)

module.exports = router 