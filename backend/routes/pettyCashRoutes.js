const r=require('express').Router();
const ctrl=require('../controllers/pettyCashController');
const auth=require('../middleware/authMiddleware');
r.use(auth);
r.get('/', ctrl.getAll);
r.post('/', ctrl.create);
module.exports = r;