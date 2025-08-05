const db = require('./db');
exports.createTable = () => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`);
};
exports.findByUsername = (username, cb) => db.get('SELECT * FROM users WHERE username = ?', [username], cb);