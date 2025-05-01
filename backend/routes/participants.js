const express = require('express');
const router = express.Router();
const db = require('../startup/db');
const auth = require('../middleware/auth');

// Register for an event
router.post('/register', auth, async (req, res) => {
  const { event_id, team_name } = req.body;
  const user = req.user;

  try {
    // Check if the event is approved
    const [[event]] = await db.query(
      `SELECT registration_fee FROM event_details WHERE event_id = ? AND approved = 1`,
      [event_id]
    );

    if (!event) {
      return res.status(400).send({ error: 'Event not found or not approved.' });
    }

    // Insert into participants table
    await db.query(
      `INSERT INTO participants (user_id, team_name, event_id)
       VALUES (?, ?, ?)`,
      [user.id, team_name || null, event_id]
    );

    // Insert into participant_event_payments table
    await db.query(
      `INSERT INTO participant_event_payments (user_id, event_id, amount, payment_status)
       VALUES (?, ?, ?, false)`,
      [user.id, event_id, event.registration_fee]
    );

    res.send({ message: 'Registered successfully. Proceed to payment.' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Registration failed.' });
  }
});

// Mark payment complete if amount is valid
router.post('/complete-payment', auth, async (req, res) => {
  const { event_id, amount_paid } = req.body;
  const user = req.user;

  try {
    // Fetch required fee from event_details
    const [[event]] = await db.query(
      `SELECT registration_fee FROM event_details WHERE event_id = ?`,
      [event_id]
    );

    if (!event) {
      return res.status(404).send({ error: 'Event not found.' });
    }

    if (amount_paid < event.registration_fee) {
      return res.status(400).send({ error: 'Insufficient amount. Payment failed.' });
    }

    // Update payment status
    const [result] = await db.query(
      `UPDATE participant_event_payments
       SET payment_status = true
       WHERE user_id = ? AND event_id = ?`,
      [user.id, event_id]
    );

    if (result.affectedRows === 0) {
      return res.status(400).send({ error: 'No pending payment record found for this event.' });
    }

    res.send({ message: 'Payment completed successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to complete payment.' });
  }
});

module.exports = router;
