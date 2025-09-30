const connection = require('../config/config.js');

async function createUser(name) {
  const sql = 'INSERT INTO users (`name`) VALUES (?)';
  const [result] = await connection.promise().execute(sql, [name]);
  return { _id: result.insertId };
}

async function getUserById(_id) {
  const sql = 'SELECT `_id`, `name` FROM users WHERE `_id` = ?';
  const [rows] = await connection.promise().execute(sql, [_id]);
  return rows[0] || null;
}

module.exports = {
  createUser,
  getUserById
};