// routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

//Create a ticket
router.post('/', async (req, res) => {
  try {
      const { seatNumber, status, userDetails } = req.body;
      
      // Check if the ticket already exists to avoid duplicates
      const existingTicket = await Ticket.findOne({ seatNumber });
      if (existingTicket) {
          return res.status(400).send({ message: 'Ticket for this seat number already exists' });
      }

      // Create a new ticket if it does not exist
      const newTicket = new Ticket({
          seatNumber,
          status,
          userDetails: status === 'closed' ? userDetails : {}
      });
      
      await newTicket.save(); // Save the new ticket to the database
      res.status(201).send(newTicket); // Respond with the created ticket
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
});



// Update ticket status (open/close) and add user details for closed tickets
router.patch('/:seatNumber', async (req, res) => {
  try {
      const { seatNumber } = req.params;
      const { status, userDetails } = req.body;
      
      const ticket = await Ticket.findOneAndUpdate({ seatNumber }, {
          status,
          userDetails: status === 'closed' ? userDetails : {}
      }, { new: true });

      if (!ticket) {
          return res.status(404).send({ message: 'Ticket not found' });
      }

      res.send(ticket);
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
});


// View ticket status by seat number
router.get('/:seatNumber', async (req, res) => {
  try {
      const { seatNumber } = req.params;
      const ticket = await Ticket.findOne({ seatNumber });

      if (!ticket) {
          return res.status(404).send({ message: 'Ticket not found' });
      }

      res.send({ status: ticket.status });
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
});


// View all closed tickets
router.get('/status/closed', async (req, res) => {
  try {
      const tickets = await Ticket.find({ status: 'closed' });
      res.send(tickets);
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
});

// View all open tickets
router.get('/status/open', async (req, res) => {
  try {
      const tickets = await Ticket.find({ status: 'open' });
      res.send(tickets);
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
});


// View user details by ticket's seat number
router.get('/user-details/:seatNumber', async (req, res) => {
  try {
      const { seatNumber } = req.params;
      const ticket = await Ticket.findOne({ seatNumber, status: 'closed' });

      if (!ticket) {
          return res.status(404).send({ message: 'Ticket not found or is not booked' });
      }

      res.send(ticket.userDetails);
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
});


// Reset all tickets to open (Admin only)
router.post('/reset', async (req, res) => {
  try {
      await Ticket.updateMany({}, { status: 'open', userDetails: {} });
      res.send({ message: 'All tickets have been reset to open' });
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
});


module.exports = router;
