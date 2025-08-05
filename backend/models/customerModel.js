const db = require('./db');
exports.createTable = () => {
  db.run(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT
  )`);
};
exports.getAll = cb => db.all('SELECT * FROM customers', cb);
exports.create = (cust, cb) => db.run(
  'INSERT INTO customers(name,email,phone,address) VALUES(?,?,?,?)',
  [cust.name,cust.email,cust.phone,cust.address], cb);