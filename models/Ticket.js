const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  seatNumber: { type: Number, required: true, unique: true },
  status: { type: String, required: true, enum: ['open', 'closed'] },
  userDetails: {
    name: String,
    email: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
