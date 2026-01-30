const db = require('../config/database')

class UserRepository {
    async GetAll(condition = ['*']) {
        const rows = await db.select(condition).from('users')
        return rows
    }

    async GetOne(username, condition = ['*']) {
        const rows = await db.select(condition).from('users').where({ username: username }).first()
        return rows
    }

    async Create(setData) {
        const result = await db.insert(setData).into('users')
        return { id: result[0], ...setData }
    }

    async Update(username, setData) {
        await db.update(setData).from('users').where({ username: username })
        return this.GetOne(username, ['user_id', 'first_name', 'last_name', 'address', 'phone_number', 'role', 'is_active', 'updated_at', 'updated_by', 'updated_by_username'])
    }

    async Delete(username) {
        await db.from('users').where({ username: username }).delete()
        return null
    }
}

module.exports = new UserRepository()