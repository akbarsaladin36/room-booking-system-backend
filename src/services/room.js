const helper = require('../config/helper')
const roomRepository = require('../repositories/room')

class RoomService {
    async GetRoomsService(req, res) {
        try {
            const rooms = await roomRepository.GetAll()
            if(rooms.length > 0) {
                return helper.GetResponse(res, 200, 'All rooms are succesfully appeared!', rooms)
            } else {
                return helper.GetResponse(res, 400, 'All rooms are empty!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async GetRoomsByWorkspaceService(req, res) {
        try {
            const { workspaceCode } = req.params
            const rooms = await roomRepository.GetAllByWorkspace(workspaceCode)
            if(rooms.length > 0) {
                return helper.GetResponse(res, 200, 'All rooms by workspace are succesfully appeared!', rooms)
            } else {
                return helper.GetResponse(res, 400, 'All rooms by workspace are empty!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async GetRoomService(req, res) {
        try {
            const { roomCode } = req.params
            const room = await roomRepository.GetOne(roomCode)
            if(room) {
                return helper.GetResponse(res, 200, 'A room data is succesfully appeared!', room)
            } else {
                return helper.GetResponse(res, 400, 'A room data is not found!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async CreateRoomService(req, res) {
        try {
            const { workspaceCode, roomName, roomDescription, roomPrice } = req.body
            const roomImagePath = req.file
            const roomCode = helper.GenerateCode('room-code')
            const room = await roomRepository.GetOne(roomCode)
            if(room) {
                return helper.GetResponse(res, 400, 'A room data is registered! Please try find a new room name again!')
            } else {
                const checkWorkspace = await roomRepository.GetOneWorkspace(workspaceCode)
                if(checkWorkspace) {
                    const authUser = req.currentUser
                    const setData = {
                        workspace_code: workspaceCode,
                        code: roomCode,
                        name: roomName,
                        description: roomDescription,
                        price: roomPrice,
                        image_path: roomImagePath ? roomImagePath.filename : null,
                        is_active: 1,
                        created_at: new Date(Date.now()),
                        created_by: authUser.uuid,
                        created_by_username: authUser.username
                    }
                    const result = await roomRepository.Create(setData)
                    return helper.GetResponse(res, 200, 'A new room is succesfully created!', result)
                } else {
                    return helper.GetResponse(res, 400, 'A workspace code has been not registered! Please create workspace first then you can create room!')
                }
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async UpdateRoomService(req, res) {
        try {
            const { roomCode } = req.params
            const { workspaceCode, roomName, roomDescription, roomPrice, roomIsActive } = req.body
            const room = await roomRepository.GetOne(roomCode)
            if(room) {
                const authUser = req.currentUser
                const setData = {
                    workspace_code: workspaceCode ? workspaceCode : room.workspace_code,
                    name: roomName ? roomName : room.name,
                    description: roomDescription ? roomName : room.description,
                    price: roomPrice ? roomPrice : room.price,
                    is_active: roomIsActive ? roomIsActive : room.is_active,
                    updated_at: new Date(Date.now()),
                    updated_by: authUser.uuid,
                    updated_by_username: authUser.username
                }
                const result = await roomRepository.Update(roomCode, setData)
                return helper.GetResponse(res, 200, 'A room data is succesfully updated!', result)
            } else {
                return helper.GetResponse(res, 400, 'A room data is not found!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async DeleteRoomService(req, res) {
        try {
            const { roomCode } = req.params
            const room = await roomRepository.GetOne(roomCode)
            if(room) {
                await roomRepository.Delete(roomCode)
                return helper.GetResponse(res, 200, 'A room data is succesfully deleted!')
            } else {
                return helper.GetResponse(res, 400, 'A room data is not found!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }
}

module.exports = new RoomService()