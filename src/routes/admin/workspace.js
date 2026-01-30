const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const workspaceController = require('../../controllers/workspace')
const uploadImage = require('../../config/upload')

router.get('/', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), workspaceController.GetWorkspacesController)
router.get('/:workspaceCode', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), workspaceController.GetWorkspaceController)
router.post('/', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), uploadImage('workspaceImagePath'), workspaceController.CreateWorkspaceController)
router.patch('/:workspaceCode', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), workspaceController.UpdateWorkspaceController)
router.delete('/:workspaceCode', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), workspaceController.DeleteWorkspaceController)

module.exports = router