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

    async GetTotalAll() {
        const rows = await db.select(
            db.raw("CONCAT(YEAR(created_at), '-', LPAD(MONTH(created_at),2,'0')) AS month_year"),
            db.raw(`SUM(CASE WHEN transaction_type = 'revenue' THEN total_price ELSE 0 END) AS revenue`),
            db.raw(`SUM(CASE WHEN transaction_type = 'expense' THEN total_price ELSE 0 END) AS expense`)
        )
        .from('transactions')
        .groupByRaw("YEAR(created_at), MONTH(created_at)")
        .orderByRaw("YEAR(created_at), MONTH(created_at)")
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