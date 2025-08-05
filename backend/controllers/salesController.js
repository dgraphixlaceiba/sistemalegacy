const model = require('../models/saleModel');
exports.getAll = (req,res) => model.getAll((e,r)=>e?res.status(500).json({error:e.message}):res.json(r));
exports.create = (req,res) => {
  const sale = req.body;
  model.create(sale,(err)=>err?res.status(500).json({error:err.message}):res.json({message:'Venta creada'}));
};