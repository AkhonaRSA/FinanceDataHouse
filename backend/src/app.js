const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const appRouter = require('./routes'); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/finances", appRouter);

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;