const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findByUsername } = require('../models/userModel');
exports.login = (req,res) => {
  const { username,password } = req.body;
  findByUsername(username,(err,user) => {
    if(err) return res.status(500).json({error:err.message});
    if(!user || !bcrypt.compareSync(password,user.password)) return res.status(401).json({message:'Credenciales inválidas'});
    const token = jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET,{expiresIn:'8h'});
    res.json({token,username:user.username,role:user.role});
  });
};