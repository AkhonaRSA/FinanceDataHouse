const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const appRouter = require('./routes'); // <-- require router directly

const app = express();

// basic middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// mount API v1
app.use("/api/finances", appRouter);

// health route
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;