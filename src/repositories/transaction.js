const db = require('../config/database')

class TransactionRepository {
    async GetAll(columns = ['*']) {
        const rows = await db.select(columns).from('transactions')
        return rows
    }

    async GetAllByUser(userUuid, columns = ['*']) {
        const rows = await db.select(columns).from('transactions').where({ user_uuid: userUuid })
        return rows
    }

    async GetOne(transactionCode, columns = ['*']) {
        const rows = await db.select(columns).from('transactions').where({ code: transactionCode }).first()
        return rows
    }

    async GetOneBooking(bookingCode, columns = ['*']) {
        const rows = await db.select(columns).from('bookings').where({ code: bookingCode }).first()
        return rows
    }

    async Create(setData) {
        const result = await db.insert(setData).into('transactions')
        return { id: result[0], ...setData }
    }

    async Update(transactionCode, setData) {
        await db.update(setData).from('transactions').where({ code: transactionCode })
        return this.GetOne(transactionCode)
    }

    async Delete(transactionCode) {
        await db.from('transactions').where({ code: transactionCode }).delete()
        return null
    }
}

module.exports = new TransactionRepository()