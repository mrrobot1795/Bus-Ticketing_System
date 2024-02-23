const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Load environment variables
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const ticketRoutes = require('./routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);