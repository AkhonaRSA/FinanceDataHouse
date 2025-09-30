const express = require('express');
const multer = require('multer');
const router = express.Router();
const ctrl = require('../controllers/finance-controllers.js');

// memory storage; file field name expected: "file"
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(xlsx|xls)$/i)) {
      return cb(new Error('Only .xlsx/.xls files are allowed'));
    }
    cb(null, true);
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
});

router.post('/upload/:userId/:year', upload.single('file'), ctrl.uploadExcel);
// GET /api/finances/:userId/:year
router.get('/:userId/:year', ctrl.getRecordsByUserYear);

module.exports = router;