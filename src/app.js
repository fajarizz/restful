const express = require('express');
const userRoutes = require('./routes/user-route');
const addressRoutes = require('./routes/address-route');
const contactRoutes = require('./routes/contact-route');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/addresses', addressRoutes);
app.use('/contacts', contactRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
