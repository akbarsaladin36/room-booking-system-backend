/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('workspaces', function (table) {
        table.increments('workspace_id', { primaryKey: true })
        table.string('code', 200).nullable()
        table.string('name', 200).nullable()
        table.text('address').nullable()
        table.text('image_path').nullable()
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
  return knex.schema.dropTable('workspaces')
};
