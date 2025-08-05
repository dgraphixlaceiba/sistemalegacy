const model = require('../models/customerModel');
exports.getAll = (req,res) => model.getAll((e,r)=>e?res.status(500).json({error:e.message}):res.json(r));
exports.create = (req,res) => model.create(req.body,(err)=>err?res.status(500).json({error:err.message}):res.json({message:'Cliente creado'}));