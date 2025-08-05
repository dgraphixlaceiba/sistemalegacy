const db = require('./db');
exports.createTable = () => {
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    date TEXT,
    status TEXT
  )`);
};
exports.getAll = cb => db.all('SELECT * FROM orders', cb);
exports.create = (order, cb) => db.run(
  'INSERT INTO orders(customer_id,date,status) VALUES(?,?,?)',
  [order.customer_id,order.date,order.status], cb);