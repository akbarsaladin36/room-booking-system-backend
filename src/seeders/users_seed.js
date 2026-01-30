const helper = require('../config/helper')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  const users = [
    { username: 'admin', email: 'admin@mail.com', password: helper.HashPassword('admin'), role: 'admin'},
    { username: 'user1', email: 'user1@mail.com', password: helper.HashPassword('user1'), role: 'user'},
    { username: 'user2', email: 'user2@mail.com', password: helper.HashPassword('user2'), role: 'user'},
    { username: 'user3', email: 'user3@mail.com', password: helper.HashPassword('user3'), role: 'user'},
    { username: 'user4', email: 'user4@mail.com', password: helper.HashPassword('user4'), role: 'user'},
    { username: 'user5', email: 'user5@mail.com', password: helper.HashPassword('user5'), role: 'user'}
  ]

  const data = users.map((user) => {
    const uuid = helper.GenerateUuid()
    return {
      uuid: uuid,
      username: user.username, 
      email: user.email, 
      password: user.password, 
      role: user.role, 
      is_active: 1, 
      created_at: new Date(Date.now()),
      created_by: uuid, 
      created_by_username: user.username
    }
  });

  await knex('users').insert(data);
};
