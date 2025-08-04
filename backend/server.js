const usuariosRouter = require('./routes/usuarios');
app.use('/api/usuarios', usuariosRouter);
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../frontend'));

// Ruta prueba
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Backend DGraphix activo' });
});

// Rutas para usuarios (login, listado, etc.)

app.post('/api/login', (req, res) => {
  const { usuario, password } = req.body;
  db.get(
    'SELECT * FROM usuarios WHERE usuario = ? AND password = ?',
    [usuario, password],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!row) {
        res.status(401).json({ error: 'Credenciales incorrectas' });
      } else {
        res.json({ id: row.id, usuario: row.usuario, rol: row.rol });
      }
    }
  );
});

// Agrega aquí rutas para inventario, productos, ventas, comisiones, caja chica, clientes, etc.
// Cada módulo con GET, POST, PUT, DELETE según corresponda

// Ejemplo básico para agregar materia prima
app.post('/api/materia-prima', (req, res) => {
  const { nombre, cantidad, unidad, stock_minimo } = req.body;
  db.run(
    'INSERT INTO materia_prima (nombre, cantidad, unidad, stock_minimo) VALUES (?, ?, ?, ?)',
    [nombre, cantidad, unidad, stock_minimo],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID });
      }
    }
  );
});

// Agrega el resto conforme lo necesites...

app.listen(PORT, () => {
  console.log(`Backend escuchando en puerto ${PORT}`);
});
