require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDB } = require('./seed');
const authRoutes = require('./routes/authRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const salesRoutes = require('./routes/salesRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const customersRoutes = require('./routes/customersRoutes');
const pettyCashRoutes = require('./routes/pettyCashRoutes');
const costRoutes = require('./routes/costRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize DB and seed admin
initDB();

app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/pettycash', pettyCashRoutes);
app.use('/api/cost', costRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));