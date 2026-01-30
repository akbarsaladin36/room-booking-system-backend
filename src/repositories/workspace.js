const db = require('../config/database')

class WorkspaceRepository {
    async GetAll(condition = ['*']) {
        const rows = await db.select(condition).from('workspaces')
        return rows
    }

    async GetOne(workspaceCode, condition = ['*']) {
        const rows = await db.select(condition).from('workspaces').where({ code: workspaceCode }).first()
        return rows
    }

    async Create(setData) {
        const result = await db.insert(setData).into('workspaces')
        return { id: result[0], ...setData }
    }

    async Update(workspaceCode, setData) {
        await db.update(setData).from('workspaces').where({ code: workspaceCode })
        return this.GetOne(workspaceCode)
    }

    async Delete(workspaceCode) {
        await db.from('workspaces').where({ code: workspaceCode }).delete()
        return null
    }
}

module.exports = new WorkspaceRepository()