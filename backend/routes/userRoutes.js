const { registerUser, loginUser } = require('../controllers/userControllers')
const { protect } = require('../middleware/authUser')

const router = require('express').Router()

router.post('/', registerUser)
router.post('/login', loginUser)
module.exports = router 