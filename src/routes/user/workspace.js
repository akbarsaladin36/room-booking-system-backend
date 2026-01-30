const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const workspaceController = require('../../controllers/workspace')

router.get('/', authMiddleware.userAuthentication, authMiddleware.checkRole('user'), workspaceController.GetWorkspacesController)
router.get('/:workspaceCode', authMiddleware.userAuthentication, authMiddleware.checkRole('user'), workspaceController.GetWorkspaceController)

module.exports = router