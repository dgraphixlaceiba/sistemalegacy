const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar clientes
router.get('/', (req, res) => {
  db.all('SELECT * FROM clientes', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Crear cliente
router.post('/', (req, res) => {
  const { nombre, telefono, email } = req.body;
  db.run(
    'INSERT INTO clientes (nombre, telefono, email) VALUES (?, ?, ?)',
    [nombre, telefono, email],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

module.exports = router;
