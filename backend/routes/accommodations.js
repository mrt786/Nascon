const express = require('express');
const router = express.Router();
const db = require('../startup/db');
const auth = require('../middleware/auth');

// Book an accommodation
router.post('/book', auth, async (req, res) => {
    const { accommodation_id, booking_date } = req.body;
    const user_id = req.user.id;

    // Only participants can book accommodations
    if (req.user.role !== 'participant') {
      return res.status(403).send({ error: 'Access denied. Only participants can book accommodations.' });
    }

    try {
      // Check availability and capacity
      const [[accommodation]] = await db.query(
        'SELECT * FROM accommodations WHERE accommodation_id = ? AND availability = TRUE',
        [accommodation_id]
      );
      if (!accommodation) return res.status(400).send({ error: 'Accommodation not available.' });

      if (accommodation.booking_count >= accommodation.capacity)
        return res.status(400).send({ error: 'Accommodation is fully booked.' });

      // Check for duplicate booking for the same date
      const [[alreadyBooked]] = await db.query(
        'SELECT 1 FROM booked_accommodations WHERE user_id = ? AND booking_date = ?',
        [user_id, booking_date]
      );
      if (alreadyBooked) {
        return res.status(400).send({ error: 'You have already booked accommodation for this date.' });
      }

      // Insert payment entry
      const [paymentResult] = await db.query(
        'INSERT INTO participant_accommodation_payments (user_id, amount, payment_status) VALUES (?, ?, ?)',
        [user_id, accommodation.price, false]
      );

      const payment_id = paymentResult.insertId;

      // Insert booking
      await db.query(
        'INSERT INTO booked_accommodations (accommodation_id, user_id, payment_id, booking_date) VALUES (?, ?, ?, ?)',
        [accommodation_id, user_id, payment_id, booking_date]
      );

      // Increment booking count
      await db.query(
        'UPDATE accommodations SET booking_count = booking_count + 1 WHERE accommodation_id = ?',
        [accommodation_id]
      );

      res.send({ message: 'Accommodation booked. Please proceed to payment.', payment_id });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).send({ error: 'Duplicate booking or payment.' });
      }
      res.status(500).send({ error: err.message });
    }
  });

// Make a payment
router.post('/pay', auth, async (req, res) => {
  const { payment_id, amount } = req.body;
  const user_id = req.user.id;

  try {
    const [[payment]] = await db.query('SELECT * FROM participant_accommodation_payments WHERE payment_id = ? AND user_id = ?', [payment_id, user_id]);
    if (!payment) return res.status(404).send({ error: 'Payment not found.' });

    if (payment.payment_status) {
      return res.status(400).send({ error: 'Payment already completed.' });
    }

    if (amount < payment.amount)
      return res.status(400).send({ error: `Amount is less than required (${payment.amount})` });

    await db.query('UPDATE participant_accommodation_payments SET payment_status = TRUE WHERE payment_id = ?', [payment_id]);
    res.send({ message: 'Payment successful!' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// List all available accommodations
router.get('/available', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM accommodations WHERE availability = TRUE and booking_count < capacity');
      res.send(rows);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

  // Get accommodation by ID
router.get('/:id', async (req, res) => {
  const accommodationId = req.params.id;

  try {
    const [rows] = await db.query('SELECT * FROM accommodations WHERE accommodation_id = ?', [accommodationId]);
    
    if (rows.length === 0)
      return res.status(404).send({ error: 'Accommodation not found.' });

    res.send(rows[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
  

module.exports = router;