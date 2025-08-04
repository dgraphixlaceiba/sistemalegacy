const express = require('express');
const router = express.Router();
const db = require('../db');

// Crear usuario (solo admin)
router.post('/', (req, res) => {
  const { usuario, password, rol } = req.body;
  db.run(
    'INSERT INTO usuarios (usuario, password, rol) VALUES (?, ?, ?)',
    [usuario, password, rol],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Login
router.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  db.get(
    'SELECT * FROM usuarios WHERE usuario = ? AND password = ?',
    [usuario, password],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(401).json({ error: 'Credenciales incorrectas' });
      res.json({ id: row.id, usuario: row.usuario, rol: row.rol });
    }
  );
});

module.exports = router;
