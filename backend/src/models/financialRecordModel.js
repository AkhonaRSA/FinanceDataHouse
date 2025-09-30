const connection = require('../config/config.js');

async function createFinancialRecord({ user_id, year, month, amount }) {
  const sql = `
    INSERT INTO financial_records
      (user_id, year, month, amount, created_at, updated_at)
    VALUES (?, ?, ?, ?, NOW(), NOW())
  `;
  const [result] = await connection.promise().execute(sql, [
    user_id,
    year,
    month,
    amount
  ]);
  return { _record_id: result.insertId, result };
}


async function createFinancialRecords(records) {
  if (!Array.isArray(records) || records.length === 0) return { inserted: 0, ids: [] };
  const conn = connection.promise();
  await conn.query('START TRANSACTION');
  try {
    const ids = [];
    for (const r of records) {
      const [res] = await conn.execute(
        `INSERT INTO financial_records (user_id, year, month, amount, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())`,
        [r.user_id, r.year, r.month, r.amount]
      );
      ids.push(res.insertId);
    }
    await conn.query('COMMIT');
    return { inserted: ids.length, ids };
  } catch (err) {
    await conn.query('ROLLBACK');
    throw err;
  }
}

async function getRecordsByUser(user_id) {
  const sql = 'SELECT * FROM financial_records WHERE user_id = ? ORDER BY year DESC, month ASC';
  const [rows] = await connection.promise().execute(sql, [user_id]);
  return rows;
}

async function getRecordsByUserYear(user_id, year) {
  const sql = `
    SELECT fr._record_id, fr.user_id, fr.year, fr.month, fr.amount,
           fr.created_at, fr.updated_at,
           u.name AS user_name
    FROM financial_records fr
    JOIN users u ON u._id = fr.user_id
    WHERE fr.user_id = ? AND fr.year = ?
    ORDER BY fr.month ASC
  `;
  const [rows] = await connection.promise().execute(sql, [user_id, year]);
  return rows;
}

module.exports = {
  createFinancialRecord,
  createFinancialRecords,
  getRecordsByUser,
  getRecordsByUserYear
};