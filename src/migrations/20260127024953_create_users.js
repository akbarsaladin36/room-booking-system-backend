/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('user_id', { primaryKey: true })
    table.string('uuid', 200).nullable()
    table.string('username', 100).nullable()
    table.string('email', 100).nullable()
    table.string('password', 150).nullable()
    table.string('first_name', 100).nullable()
    table.string('last_name', 100).nullable()
    table.string('address').nullable()
    table.string('phone_number', 30).nullable()
    table.string('role', 30).nullable()
    table.integer('is_active', 5).nullable()
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
  return knex.schema.dropTable('users')
};
