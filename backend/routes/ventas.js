const express = require('express');
const router = express.Router();
const db = require('../db');

// Crear venta con detalle y comisión
router.post('/', (req, res) => {
  const { id_usuario, id_cliente, productos, metodo_pago, porcentaje_comision } = req.body;
  // productos = [{id_producto, cantidad, precio}, ...]

  const fecha = new Date().toISOString();
  let total = 0;
  productos.forEach(p => {
    total += p.precio * p.cantidad;
  });

  db.serialize(() => {
    db.run(
      'INSERT INTO ventas (id_usuario, id_cliente, total, metodo_pago, fecha, estado) VALUES (?, ?, ?, ?, ?, ?)',
      [id_usuario, id_cliente, total, metodo_pago, fecha, 'Pendiente'],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });

        const id_venta = this.lastID;

        // Insertar detalle ventas
        const stmt = db.prepare(
          'INSERT INTO detalle_ventas (id_venta, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)'
        );
        productos.forEach(p => {
          stmt.run(id_venta, p.id_producto, p.cantidad, p.precio);
        });
        stmt.finalize();

        // Calcular comisión
        const monto_comision = (total * porcentaje_comision) / 100;
        db.run(
          'INSERT INTO comisiones (id_usuario, id_venta, porcentaje, monto) VALUES (?, ?, ?, ?)',
          [id_usuario, id_venta, porcentaje_comision, monto_comision],
          (err2) => {
            if (err2) return res.status(500).json({ error: err2.message });
            res.json({ id_venta, total, monto_comision });
          }
        );
      }
    );
  });
});

// Obtener ventas (filtro opcional por usuario)
router.get('/', (req, res) => {
  const id_usuario = req.query.id_usuario;
  let query = 'SELECT * FROM ventas';
  let params = [];
  if (id_usuario) {
    query += ' WHERE id_usuario = ?';
    params.push(id_usuario);
  }
  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
