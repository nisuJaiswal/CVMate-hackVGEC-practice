const { addEducation, removeEducation, editEducation } = require('../controllers/educationControllers')
const { protect } = require('../middleware/authUser')

const router = require('express').Router()

router.post('/', protect, addEducation)
router.delete('/:id', protect, removeEducation)
router.put('/:id', protect, editEducation)


module.exports = router