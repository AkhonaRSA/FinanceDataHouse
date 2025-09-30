const app = require("../app.js");
const connection = require("../config/config.js");

const PORT = process.env.PORT || 5000;

console.log('starting backend process, NODE_ENV=', process.env.NODE_ENV);

// global error handlers — helpful to surface silent crashes
process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err);
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection', reason);
});

// quick check that connection object exists
console.log('DB connection object ok?', !!connection);

console.log('attempting DB connect...');
connection.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
  console.log('DB connected');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
