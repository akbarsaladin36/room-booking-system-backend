const db = require('../config/database')

class BookingRepository {
    async GetAll(columns = ['*']) {
        const rows = await db.select(columns).from('bookings')
        return rows
    }

    async GetAllByUser(userUuid, columns = ['*']) {
        const rows = await db.select(columns).from('bookings').where({ user_uuid: userUuid })
        return rows
    }

    async GetOne(bookingCode, columns = ['*']) {
        const rows = await db.select(columns).from('bookings').where({ code: bookingCode }).first()
        return rows
    }

    async GetOneWorkspace(workspaceCode, columns = ['*']) {
        const rows = await db.select(columns).from('workspaces').where({ code: workspaceCode }).first()
        return rows
    }

    async GetOneRoom(roomCode, columns = ['*']) {
        const rows = await db.select(columns).from('rooms').where({ code: roomCode }).first()
        return rows
    }

    async Create(setData) {
        const result = await db.insert(setData).into('bookings')
        return { id: result[0], ...setData }
    }

    async CreatePayment(setData) {
        const result = await db.insert(setData).into('transactions')
        return { id: result[0], ...setData }
    }

    async Update(bookingCode, setData) {
        await db.update(setData).from('bookings').where({ code: bookingCode })
        return this.GetOne(bookingCode)
    }

    async Delete(bookingCode) {
        await db.from('bookings').where({ code: bookingCode }).delete()
        return null
    }
}

module.exports = new BookingRepository()