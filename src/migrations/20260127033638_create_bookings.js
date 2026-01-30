/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('bookings', function (table) {
        table.increments('booking_id', { primaryKey: true })
        table.string('workspace_code', 200).nullable()
        table.string('room_code', 200).nullable()
        table.string('user_uuid', 200).nullable()
        table.string('code', 200).nullable()
        table.string('name', 150).nullable()
        table.text('description').nullable()
        table.dateTime('start_time_at').nullable()
        table.dateTime('end_time_at').nullable()
        table.string('price', 30).nullable()
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
  return knex.schema.dropTable('bookings')
};
