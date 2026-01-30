const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const profileController = require('../../controllers/profile')

router.get('/', authMiddleware.userAuthentication, authMiddleware.checkRole('user'), profileController.GetProfileController)
router.patch('/', authMiddleware.userAuthentication, authMiddleware.checkRole('user'), profileController.UpdateProfileController)

module.exports = router