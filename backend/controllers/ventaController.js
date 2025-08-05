const { addVenta, getAllVentas } = require('../models/ventaModel');
const { updateProductoStock, getProductoById } = require('../models/productoModel');

const crearVenta = (req, res) => {
  const venta = req.body;

  getProductoById(venta.producto_id, (err, producto) => {
    if (err) return res.status(500).json({ message: 'Error al obtener producto' });
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

    if (producto.stock < venta.cantidad) {
      return res.status(400).json({ message: 'Stock insuficiente' });
    }

    const nuevoStock = producto.stock - venta.cantidad;

    addVenta(venta, (err, id) => {
      if (err) return res.status(500).json({ message: 'Error al crear venta' });

      updateProductoStock(venta.producto_id, nuevoStock, (err) => {
        if (err) return res.status(500).json({ message: 'Error al actualizar stock' });

        res.json({ message: 'Venta creada', id });
      });
    });
  });
};

const listarVentas = (req, res) => {
  getAllVentas((err, ventas) => {
    if (err) return res.status(500).json({ message: 'Error al obtener ventas' });
    res.json(ventas);
  });
};

module.exports = {
  crearVenta,
  listarVentas
};
