const db = require('./db');
exports.createTable = () => {
  db.run(`CREATE TABLE IF NOT EXISTS petty_cash (
    id INTEGER PRIMARY KEY,
    amount REAL,
    date TEXT,
    description TEXT,
    type TEXT
  )`);
};
exports.getAll = cb => db.all('SELECT * FROM petty_cash', cb);
exports.create = (pc, cb) => db.run(
  'INSERT INTO petty_cash(amount,date,description,type) VALUES(?,?,?,?)',
  [pc.amount,pc.date,pc.description,pc.type], cb);