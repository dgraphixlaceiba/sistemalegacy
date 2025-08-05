const model = require('../models/inventoryModel');
exports.getAll = (req,res) => model.getAll((err,rows)=>err?res.status(500).json({error:err.message}):res.json(rows));
exports.create = (req,res) => model.create(req.body,(err)=>err?res.status(500).json({error:err.message}):res.json({message:'Creado'}));