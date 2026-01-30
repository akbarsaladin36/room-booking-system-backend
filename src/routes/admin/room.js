const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const roomController = require('../../controllers/room')
const uploadImage = require('../../config/upload')

router.get('/', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), roomController.GetRoomsController)
router.get('/workspaces/:workspaceCode', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), roomController.GetRoomsByWorkspaceController)
router.get('/:roomCode', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), roomController.GetRoomController)
router.post('/', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), uploadImage('roomImagePath'), roomController.CreateRoomController)
router.patch('/:roomCode', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), roomController.UpdateRoomController)
router.delete('/:roomCode', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), roomController.DeleteRoomController)

module.exports = router