/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('rooms', function (table) {
        table.increments('room_id', { primaryKey: true })
        table.string('workspace_code', 200).nullable()
        table.string('code', 200).nullable()
        table.string('name', 150).nullable()
        table.text('description').nullable()
        table.text('image_path').nullable()
        table.string('price', 30).nullable()
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
  return knex.schema.dropTable('rooms')
};
