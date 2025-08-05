const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar gastos caja chica
router.get('/', (req, res) => {
  db.all('SELECT * FROM caja_chica ORDER BY fecha DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Agregar gasto caja chica
router.post('/', (req, res) => {
  const { descripcion, monto, fecha } = req.body;
  db.run(
    'INSERT INTO caja_chica (descripcion, monto, fecha) VALUES (?, ?, ?)',
    [descripcion, monto, fecha],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

module.exports = router;
