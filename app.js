// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const ticketRoutes = require('./routes/ticketRoutes');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/tickets', ticketRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Placeholder for routes
app.get('/', (req, res) => res.send('Bus Ticketing API'));

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
