const db = require('../config/database')

class AuthRepository {
    async FindOne(username) {
        const rows = await db.select('*').from('users').where({ username: username }).first()
        return rows
    }

    async Create(setData) {
        const result = await db.insert(setData).into('users')
        return { id: result[0], ...setData }
    }
}

module.exports = new AuthRepository()