const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

app.get('/api/ping', (req, res) => {
  res.json({ message: 'Sistema DGraphix funcionando' });
});

// Aquí puedes agregar rutas para inventario, ventas, usuarios, etc.

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
