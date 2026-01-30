/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('transactions', function (table) {
        table.increments('transaction_id', { primaryKey: true })
        table.string('workspace_code', 200).nullable()
        table.string('booking_code', 200).nullable()
        table.string('user_uuid', 200).nullable()
        table.string('code', 200).nullable()
        table.string('name', 150).nullable()
        table.text('description').nullable()
        table.string('payment_type', 200).nullable()
        table.string('transaction_type', 200).nullable()
        table.string('total_price', 30).nullable()
        table.string('status', 10).nullable()
        table.dateTime('created_at').nullable()
        table.string('created_by', 200).nullable()
        table.string('created_by_username', 100).nullable()
        table.dateTime('updated_at').nullable()
        table.string('updated_by', 200).nullable()
        table.string('updated_by_username', 100).nullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('transactions')
};
