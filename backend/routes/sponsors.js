const express = require('express');
const router = express.Router();
const db = require('../startup/db');
const auth = require('../middleware/auth');


// view all approved events + their sponsorship packages (sponsors only)
router.get('/approved-events', auth, async (req, res) => {
  if (req.user.role !== 'sponsor') {
    return res.status(403).send({ error: 'Access denied. Only sponsors can view this.' });
  }

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
         p.sponsor_level,
         p.sponsor_amount
       FROM nascon_events e
       JOIN event_details d ON e.event_id = d.event_id
       JOIN event_sponsorship_packages p ON e.event_id = p.event_id
       WHERE d.approved = 1`
    );
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to fetch approved events for sponsors.' });
  }
});

// choose an event + package -> creates payment record + link  (sponsor only)
router.post('/select-package', auth, async (req, res) => {
  if (req.user.role !== 'sponsor') {
    return res.status(403).send({ error: 'Access denied. Only sponsors can select packages.' });
  }

  const { event_id, sponsor_level } = req.body;
  const sponsor_id = req.user.user_id;

  if (!event_id || !sponsor_level) {
    return res.status(400).send({ error: 'event_id and sponsor_level are required.' });
  }

  try {
    // 1) get the amount from the package
    const [[pkg]] = await db.query(
      'SELECT sponsor_amount FROM event_sponsorship_packages WHERE event_id = ? AND sponsor_level = ?',
      [event_id, sponsor_level]
    );
    if (!pkg) return res.status(404).send({ error: 'Sponsorship package not found.' });

    // 2) insert into sponsor_payments (no event_sponsors yet)
    const [payResult] = await db.query(
      'INSERT INTO sponsor_payments (sponsor_id, amount, payment_status) VALUES (?, ?, false)',
      [sponsor_id, pkg.sponsor_amount]
    );
    const payment_id = payResult.insertId;


    // 3) create a payment link
    const [event_sponsor] = await db.query(
      'INSERT INTO event_sponsors (event_id, sponsor_id, payment_id) VALUES (?, ?, ?)',[event_id, sponsor_id, payment_id]);

    res.send({
      message: 'Package reserved; complete payment to finalize sponsorship.',
      payment_id,
      event_id,
      sponsor_level
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to select sponsorship package.' });
  }
});

// 3) get own payments + statuses (sponsors only)
router.get('/payments', auth, async (req, res) => {
  if (req.user.role !== 'sponsor') {
    return res.status(403).send({ error: 'Access denied. Only sponsors can view payments.' });
  }

  const sponsor_id = req.user.user_id;
  try {
    const [rows] = await db.query(
      `SELECT 
         sp.payment_id,
         sp.amount,
         sp.payment_status,
         es.event_id,
         d.event_name,
         es.sponsor_id,
         p.sponsor_level
       FROM sponsor_payments sp
       JOIN event_sponsors es    ON sp.payment_id = es.payment_id
       JOIN event_sponsorship_packages p 
         ON es.event_id = p.event_id
       JOIN event_details d 
         ON es.event_id = d.event_id
       WHERE es.sponsor_id = ?`,
      [sponsor_id]
    );
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to fetch your payments.' });
  }
});

// Sponsors only: pay for a pending payment
router.post('/pay', auth, async (req, res) => {
  if (req.user.role !== 'sponsor') {
    return res.status(403).send({ error: 'Access denied. Only sponsors can pay.' });
  }

  const sponsor_id = req.user.user_id;
  const { payment_id } = req.body;
  // Expect client to send back event_id & sponsor_level for this payment:
  const { event_id, sponsor_level } = req.body;
  if (!event_id || !sponsor_level) {
    return res.status(400).send({ error: 'event_id and sponsor_level are required to finalize sponsorship.' });
  }

  try {
    // 1) verify payment belongs to sponsor & is pending
    const [[ existing ]] = await db.query(
      'SELECT payment_status FROM sponsor_payments WHERE payment_id = ? AND sponsor_id = ?',
      [payment_id, sponsor_id]
    );
    if (!existing) return res.status(404).send({ error: 'Payment not found.' });
    if (existing.payment_status) return res.status(400).send({ error: 'Payment already completed.' });

    // 2) mark as paid
    await db.query(
      'UPDATE sponsor_payments SET payment_status = true WHERE payment_id = ?',
      [payment_id]
    );

    res.send({ message: 'Payment successful and sponsorship confirmed.' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to process payment.' });
  }
});


module.exports = router;