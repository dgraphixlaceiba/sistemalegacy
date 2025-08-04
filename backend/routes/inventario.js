const express = require('express');
const router = express.Router();
const db = require('../db');

// Materia Prima - Listar
router.get('/materia-prima', (req, res) => {
  db.all('SELECT * FROM materia_prima', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Materia Prima - Agregar
router.post('/materia-prima', (req, res) => {
  const { nombre, cantidad, unidad, stock_minimo } = req.body;
  db.run(
    'INSERT INTO materia_prima (nombre, cantidad, unidad, stock_minimo) VALUES (?, ?, ?, ?)',
    [nombre, cantidad, unidad, stock_minimo],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Actualizar cantidad Materia Prima
router.put('/materia-prima/:id', (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;
  db.run('UPDATE materia_prima SET cantidad = ? WHERE id = ?', [cantidad, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Cantidad actualizada' });
  });
});

// Productos - Listar
router.get('/productos', (req, res) => {
  db.all('SELECT * FROM productos', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Productos - Agregar
router.post('/productos', (req, res) => {
  const { nombre, descripcion, precio_unitario, precio_mayoreo, stock, stock_minimo } = req.body;
  db.run(
    'INSERT INTO productos (nombre, descripcion, precio_unitario, precio_mayoreo, stock, stock_minimo) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, descripcion, precio_unitario, precio_mayoreo, stock, stock_minimo],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Actualizar stock producto
router.put('/productos/:id', (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;
  db.run('UPDATE productos SET stock = ? WHERE id = ?', [stock, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Stock actualizado' });
  });
});

module.exports = router;
