const db = require('./db');
exports.createTable = () => {
  db.run(`CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY,
    name TEXT,
    category TEXT,
    unit TEXT,
    price REAL,
    quantity INTEGER,
    min_stock INTEGER
  )`);
};
exports.getAll = cb => db.all('SELECT * FROM inventory', cb);
exports.create = (item, cb) => db.run(
  'INSERT INTO inventory(name,category,unit,price,quantity,min_stock) VALUES(?,?,?,?,?,?)',
  [item.name,item.category,item.unit,item.price,item.quantity,item.min_stock], cb);