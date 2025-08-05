const db = require('./db');
exports.createTable = () => {
  db.run(`CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    order_id INTEGER,
    total REAL,
    date TEXT,
    commission REAL,
    method TEXT
  )`);
};
exports.getAll = cb => db.all('SELECT * FROM sales', cb);
exports.create = (sale, cb) => db.run(
  'INSERT INTO sales(user_id,order_id,total,date,commission,method) VALUES(?,?,?,?,?,?)',
  [sale.user_id,sale.order_id,sale.total,sale.date,sale.commission,sale.method], cb);