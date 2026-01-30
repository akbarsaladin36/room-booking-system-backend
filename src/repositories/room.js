const db = require('../config/database')

class RoomRepository {
    async GetAll(columns = ['*']) {
        const rows = await db.select(columns).from('rooms')
        return rows
    }

    async GetAllByWorkspace(workspaceCode, columns = ['*']) {
        const rows = await db.select(columns).from('rooms').where({ workspace_code: workspaceCode })
        return rows
    }

    async GetOne(roomCode, columns = ['*']) {
        const rows = await db.select(columns).from('rooms').where({ code: roomCode }).first()
        return rows
    }

    async GetOneWorkspace(workspaceCode, columns = ['*']) {
        const rows = await db.select(columns).from('workspaces').where({ code: workspaceCode }).first()
        return rows
    } 

    async Create(setData) {
        const result = await db.insert(setData).into('rooms')
        return { id: result[0], ...setData }
    }

    async Update(roomCode, setData) {
        await db.update(setData).from('rooms').where({ code: roomCode })
        return this.GetOne(roomCode)
    }

    async Delete(roomCode) {
        await db.from('rooms').where({ code: roomCode }).delete()
        return null
    }
}

module.exports = new RoomRepository()