const { addProducto, getAllProductos, getProductoById, updateProductoStock } = require('../models/productoModel');

const crearProducto = (req, res) => {
  const producto = req.body;
  addProducto(producto, (err, id) => {
    if (err) return res.status(500).json({ message: 'Error al crear producto' });
    res.json({ message: 'Producto creado', id });
  });
};

const listarProductos = (req, res) => {
  getAllProductos((err, productos) => {
    if (err) return res.status(500).json({ message: 'Error al obtener productos' });
    res.json(productos);
  });
};

const obtenerProducto = (req, res) => {
  const id = req.params.id;
  getProductoById(id, (err, producto) => {
    if (err) return res.status(500).json({ message: 'Error al obtener producto' });
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(producto);
  });
};

const actualizarStock = (req, res) => {
  const id = req.params.id;
  const { nuevoStock } = req.body;
  updateProductoStock(id, nuevoStock, (err) => {
    if (err) return res.status(500).json({ message: 'Error al actualizar stock' });
    res.json({ message: 'Stock actualizado' });
  });
};

module.exports = {
  crearProducto,
  listarProductos,
  obtenerProducto,
  actualizarStock
};
