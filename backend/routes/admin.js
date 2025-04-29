const express = require('express');
const router = express.Router();
const db = require('../startup/db');
const auth = require('../middleware/auth');

// Approve an event (only for admins)
router.post('/approve-event', auth, async (req, res) => {
  const { event_id } = req.body;
  const user = req.user;

  if (user.user_role !== 'admin') {
    return res.status(403).send({ error: 'Access denied. Only admins can approve events.' });
  }

  try {
    const [result] = await db.query(
      'UPDATE event_details SET approved = 1 WHERE event_id = ?',
      [event_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Event not found.' });
    }

    res.send({ message: 'Event approved successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to approve event.' });
  }
});

// Reject an event (only for admins)
router.delete('/reject-event-by-admin/:event_id', auth, async (req, res) => {
    const user = req.user;
    const { event_id } = req.params;
  
    if (user.user_role !== 'admin') {
      return res.status(403).send({ error: 'Access denied. Only admins can reject events.' });
    }
  
    try {
      // First delete from event_details
      await db.query('DELETE FROM event_details WHERE event_id = ?', [event_id]);
  
      // Then delete from nascon_events
      await db.query('DELETE FROM nascon_events WHERE event_id = ?', [event_id]);
  
      res.send({ message: `Event with ID ${event_id} has been rejected and deleted.` });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Failed to reject and delete event.' });
    }
});

// Get all pending events (only for admins)
router.get('/pending-approval-by-admin', auth, async (req, res) => {
  const user = req.user;

  if (user.user_role !== 'admin') {
    return res.status(403).send({ error: 'Access denied. Only admins can view pending events.' });
  }

  try {
    const [pendingEvents] = await db.query(
      `SELECT 
        e.event_id, 
        d.event_name, 
        d.event_date, 
        d.registration_fee, 
        d.current_round, 
        d.rules, 
        d.event_description, 
        d.max_participants, 
        e.category 
      FROM nascon_events e
      JOIN event_details d ON e.event_id = d.event_id
      WHERE d.approved = 0`
    );

    res.send(pendingEvents);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to fetch pending events.' });
  }
});


module.exports = router;