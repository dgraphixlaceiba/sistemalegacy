const db = require('./models/db');
const bcrypt = require('bcryptjs');
module.exports.initDB = () => {
  // Create tables
  require('./models/userModel').createTable();
  require('./models/inventoryModel').createTable();
  require('./models/saleModel').createTable();
  require('./models/orderModel').createTable();
  require('./models/customerModel').createTable();
  require('./models/pettyCashModel').createTable();
  // Seed admin user
  const username = 'admin', password = bcrypt.hashSync('admin',8), role = 'admin';
  db.get('SELECT * FROM users WHERE username = ?', [username], (err,row) => {
    if (!row) {
      db.run('INSERT INTO users(username,password,role) VALUES(?,?,?)', [username,password,role]);
      console.log('Seeded admin user');
    }
  });
};