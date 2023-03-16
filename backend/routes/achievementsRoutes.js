const { addAchievements } = require('../controllers/achievementsControllers')
const { protect } = require('../middleware/authUser')
const router = require('express').Router()
// module
router.post('/', protect, addAchievements)

module.exports = router