const { addEducation } = require('../controllers/educationControllers')
const { protect } = require('../middleware/authUser')

const router = require('express').Router()

router.post('/', protect, addEducation)

module.exports = router