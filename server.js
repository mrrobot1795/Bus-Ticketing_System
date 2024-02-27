const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


// Load environment variables
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Handle the root path
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


// Define routes for tickets
const ticketRoutes = require('./routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
