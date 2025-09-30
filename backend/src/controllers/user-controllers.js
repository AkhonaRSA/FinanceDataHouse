const userModel = require("../models/userModel.js");
const connection = require("../config/config.js");

// all users (id + name)
async function getAllUsers(req, res) {
  try {
    const [rows] = await connection.promise().execute('SELECT `_id`, `name` FROM users');
    return res.status(200).json({ message: 'OK', users: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'ERROR', cause: err.message });
  }
}

async function userSignUp(req, res) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Missing name' });

    const [existing] = await connection.promise().execute('SELECT `_id` FROM users WHERE `name` = ?', [name]);
    if (existing.length) return res.status(409).json({ message: 'User already exists' });

    const { _id } = await userModel.createUser(name);
    return res.status(201).json({ message: 'OK', id: _id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'ERROR', cause: err.message });
  }
}

async function userLogIn(req, res) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Missing name' });

    const [rows] = await connection.promise().execute('SELECT `_id`, `name` FROM users WHERE `name` = ?', [name]);
    if (!rows.length) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json({ message: 'OK', id: rows[0]._id, name: rows[0].name });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'ERROR', cause: err.message });
  }
}

module.exports = {
  getAllUsers,
  userSignUp,
  userLogIn,
};