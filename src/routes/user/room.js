const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const roomController = require('../../controllers/room')

router.get('/workspaces/:workspaceCode', authMiddleware.userAuthentication, authMiddleware.checkRole('user'), roomController.GetRoomsByWorkspaceController)
router.get('/:roomCode', authMiddleware.userAuthentication, authMiddleware.checkRole('user'), roomController.GetRoomController)

module.exports = router