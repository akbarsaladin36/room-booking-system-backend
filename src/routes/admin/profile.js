const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const profileController = require('../../controllers/profile')

router.get('/', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), profileController.GetProfileController)
router.patch('/', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), profileController.UpdateProfileController)

module.exports = router