const roomService = require('../services/room')

class RoomController {
    async GetRoomsController(req, res) {
        return await roomService.GetRoomsService(req, res)
    }

    async GetRoomsByWorkspaceController(req, res) {
        return await roomService.GetRoomsByWorkspaceService(req, res)
    }

    async GetRoomController(req, res) {
        return await roomService.GetRoomService(req, res)
    }

    async CreateRoomController(req, res) {
        return await roomService.CreateRoomService(req, res)
    }
    
    async UpdateRoomController(req, res) {
        return await roomService.UpdateRoomService(req, res)
    }

    async DeleteRoomController(req, res) {
        return await roomService.DeleteRoomService(req, res)
    }
}

module.exports = new RoomController()