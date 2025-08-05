const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findUserByUsername, createUser } = require('../models/userModel');

const login = (req, res) => {
  const { username, password } = req.body;

  findUserByUsername(username, (err, user) => {
    if (err) return res.status(500).json({ message: 'Error del servidor' });
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.json({ token, username: user.username, role: user.role });
  });
};

const register = (req, res) => {
  const { username, password, role } = req.body;

  createUser(username, password, role, (err, userId) => {
    if (err) {
      if (err.message.includes('UNIQUE constraint')) {
        return res.status(400).json({ message: 'Usuario ya existe' });
      }
      return res.status(500).json({ message: 'Error al crear usuario' });
    }
    res.json({ message: 'Usuario creado', userId });
  });
};

module.exports = { login, register };
