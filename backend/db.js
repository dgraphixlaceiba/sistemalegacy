const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, '../database/dgraphix.db');

if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  fs.writeFileSync(dbPath, '');
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conectado a SQLite');
  }
});

// Crear tablas si no existen

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT UNIQUE,
    password TEXT,
    rol TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    telefono TEXT,
    email TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS materia_prima (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    cantidad REAL,
    unidad TEXT,
    stock_minimo REAL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    descripcion TEXT,
    precio_unitario REAL,
    precio_mayoreo REAL,
    stock INTEGER,
    stock_minimo INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS gastos_generales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descripcion TEXT,
    monto REAL,
    fecha TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS caja_chica (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descripcion TEXT,
    monto REAL,
    fecha TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS ventas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER,
    id_cliente INTEGER,
    total REAL,
    metodo_pago TEXT,
    fecha TEXT,
    estado TEXT DEFAULT 'Pendiente'
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS detalle_ventas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_venta INTEGER,
    id_producto INTEGER,
    cantidad INTEGER,
    precio REAL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS comisiones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER,
    id_venta INTEGER,
    porcentaje REAL,
    monto REAL
  )`);

  // Agrega aquí otras tablas necesarias
});

module.exports = db;
