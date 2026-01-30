const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const userController = require('../../controllers/user')

router.get('/', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), userController.GetUsersController)
router.get('/:username', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), userController.GetUserController)
router.post('/', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), userController.CreateUserController)
router.patch('/:username', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), userController.UpdateUserController)
router.delete('/:username', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), userController.DeleteUserController)

module.exports = router