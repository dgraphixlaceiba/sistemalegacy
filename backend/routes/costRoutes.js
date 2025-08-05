const r=require('express').Router();
const ctrl=require('../controllers/costController');
r.post('/calculate', ctrl.calculate);
module.exports = r;