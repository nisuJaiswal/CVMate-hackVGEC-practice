const { addEducation, removeEducation } = require('../controllers/educationControllers')
const { protect } = require('../middleware/authUser')

const router = require('express').Router()

router.post('/', protect, addEducation)
router.delete('/:id', protect, removeEducation)

module.exports = router