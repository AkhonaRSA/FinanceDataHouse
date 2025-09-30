const ExcelJS = require('exceljs');
const recordModel = require('../models/financialRecordModel.js');
const connection = require('../config/config.js');

// POST handler expects a multipart/form-data file field named "file"
async function uploadExcel(req, res) {
  try {
    const { userId, year } = req.params;
    if (!req.file) return res.status(400).json({ message: 'ERROR', cause: 'No file uploaded' });
    if (!userId || !year) return res.status(400).json({ message: 'ERROR', cause: 'Missing userId or year param' });

    // optional: verify user exists
    const [userRows] = await connection.promise().execute('SELECT `_id`, `name` FROM users WHERE `_id` = ?', [userId]);
    if (!userRows.length) return res.status(404).json({ message: 'ERROR', cause: 'User not found' });

    // parse excel
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);
    const worksheet = workbook.worksheets[0];
    if (!worksheet) return res.status(400).json({ message: 'ERROR', cause: 'Empty workbook' });

    const parsed = [];
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      // assume first row might be header — skip if it has non-numeric month
      const rawMonth = row.getCell(1).value;
      const rawAmount = row.getCell(2).value;
      // skip header row detection: if rowNumber===1 and first cell is text
      if (rowNumber === 1 && (typeof rawMonth === 'string' || rawMonth === null)) return;
      const month = Number(rawMonth);
      const amount = Number(rawAmount);
      if (!Number.isInteger(month) || month < 1 || month > 12) {
        // invalid month -> skip (or you could collect errors)
        return;
      }
      if (!Number.isFinite(amount)) return;
      parsed.push({
        user_id: userId,
        year: Number(year),
        month,
        amount
      });
    });

    if (!parsed.length) return res.status(400).json({ message: 'ERROR', cause: 'No valid rows found in Excel' });

    const result = await recordModel.createFinancialRecords(parsed);
    return res.status(201).json({ message: 'OK', inserted: result.inserted, ids: result.ids });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'ERROR', cause: err.message });
  }
}

// GET /api/finances/:userId/:year
async function getRecordsByUserYear(req, res) {
  try {
    // strip accidental leading ":" and trim
    let { userId, year } = req.params;
    if (!userId || !year) return res.status(400).json({ message: 'ERROR', cause: 'Missing userId or year' });

    userId = String(userId).replace(/^:+/, '').trim();
    year = Number(String(year).replace(/^:+/, '').trim());

    if (!/^\d+$/.test(userId) && !/^[0-9a-fA-F-]{1,36}$/.test(userId)) {
      return res.status(400).json({ message: 'ERROR', cause: 'Invalid userId format' });
    }
    if (!Number.isInteger(year)) return res.status(400).json({ message: 'ERROR', cause: 'Invalid year' });

    const rows = await recordModel.getRecordsByUserYear(userId, year);
    // optionally return user info even if no records
    const userName = rows.length ? rows[0].user_name : null;

    return res.status(200).json({ message: 'OK', user_id: userId, user_name: userName, records: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'ERROR', cause: err.message });
  }
}

module.exports = {
  uploadExcel,
  getRecordsByUserYear
};