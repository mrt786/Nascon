const express = require('express');
const router = express.Router();
const db = require('../startup/db');
const auth = require('../middleware/auth');

// Register for an event
router.post('/register', auth, async (req, res) => {
  const { event_id, team_name } = req.body;
  const user = req.user;

  // 1. Only participants can register
  if (user.role !== 'participant') {
    return res.status(403).send({ error: 'Access denied. Only participants can register.' });
  }

  try {
    // 2. Check if the event is approved and get max_participants
    const [[event]] = await db.query(
      `SELECT registration_fee, max_participants FROM event_details WHERE event_id = ? AND approved = 1`,
      [event_id]
    );
    if (!event) {
      return res.status(400).send({ error: 'Event not found or not approved.' });
    }

    // 3. Check for duplicate registration
    const [[alreadyRegistered]] = await db.query(
      `SELECT 1 FROM participants WHERE user_id = ? AND event_id = ?`,
      [user.id, event_id]
    );
    if (alreadyRegistered) {
      return res.status(400).send({ error: 'Already registered for this event.' });
    }

    // 4. Check for duplicate team name in the same event (if team_name is provided)
    if (team_name) {
      const [[teamExists]] = await db.query(
        `SELECT 1 FROM participants WHERE event_id = ? AND team_name = ?`,
        [event_id, team_name]
      );
      if (teamExists) {
        return res.status(400).send({ error: 'This team name is already registered for this event.' });
      }
    }

    // 5. Check if event is full
    const [[{ count }]] = await db.query(
      `SELECT COUNT(*) as count FROM participants WHERE event_id = ?`,
      [event_id]
    );
    if (count >= event.max_participants) {
      return res.status(400).send({ error: 'Event is full.' });
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
    // Handle unique constraint violation for team_name
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).send({ error: 'Duplicate registration or team name.' });
    }
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

    // Check if payment is already completed
    const [[payment]] = await db.query(
      `SELECT payment_status FROM participant_event_payments WHERE user_id = ? AND event_id = ?`,
      [user.id, event_id]
    );
    if (!payment) {
      return res.status(400).send({ error: 'No pending payment record found for this event.' });
    }
    if (payment.payment_status) {
      return res.status(400).send({ error: 'Payment already completed.' });
    }

    // Update payment status
    await db.query(
      `UPDATE participant_event_payments
       SET payment_status = true
       WHERE user_id = ? AND event_id = ?`,
      [user.id, event_id]
    );

    res.send({ message: 'Payment completed successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to complete payment.' });
  }
});

// View events the participant has participated in
router.get('/my-events', auth, async (req, res) => {
  if (req.user.role !== 'participant') {
    return res.status(403).send({ error: 'Access denied. Only participants can view this.' });
  }
  const user_id = req.user.id;
  try {
    const [rows] = await db.query(
      `SELECT 
         e.event_id,
         d.event_name,
         d.event_date,
         d.registration_fee,
         d.current_round,
         d.rules,
         d.event_description,
         d.max_participants,
         e.category,
         p.team_name
       FROM participants p
       JOIN nascon_events e ON p.event_id = e.event_id
       JOIN event_details d ON e.event_id = d.event_id
       WHERE p.user_id = ?`,
      [user_id]
    );
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to fetch your events.' });
  }
});

module.exports = router;
