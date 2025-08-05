const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./dgraphix.db', err => {
  if (err) console.error(err.message);
});
module.exports = db;