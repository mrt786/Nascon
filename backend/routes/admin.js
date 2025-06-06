const express = require('express');
const router = express.Router();
const db = require('../startup/db');
const auth = require('../middleware/auth');

// Approve an event (only for admins)
router.post('/approve-event', auth, async (req, res) => {
  const { event_id } = req.body;
  const user = req.user;

  if (user.role!== 'admin') {
    return res.status(403).send({ error: 'Access denied. Only admins can approve events.' });
  }

  //first check if the event is already approved
  try {
    const [existingEvent] = await db.query(
      'SELECT approved FROM event_details WHERE event_id = ?',
      [event_id]
    );

    if (existingEvent.approved === 1) {
      return res.status(400).send({ error: 'Event already approved.' });
    }
  }
  catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Failed to check event status.' });
  }

  try {
    const [result] = await db.query(
      'UPDATE event_details SET approved = 1 WHERE event_id = ?',
      [event_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Event not found.' });
    }

    
    const [eventDetails] = await db.query(
      'SELECT max_participants FROM event_details WHERE event_id = ?',
      [event_id]
    );

    const [userDetails] = await db.query(
      'SELECT user_id FROM nascon_events WHERE event_id = ?',
      [event_id]
    );
    
    const user_id = userDetails[0].user_id
    const max_participants = eventDetails[0].max_participants;

    // schedule the event after admin approval
    try{
      // hard coded nascon start and end dates
      const [scheduingResult] = await db.query('call auto_schedule_event(?, ?, ?, ?, ?)', [user_id, event_id, max_participants, '2025-05-02', '2025-05-04']);
    }
    catch(err){
      console.error(err);
      return res.status(500).send({ error: 'Failed to schedule event. Call the scheduling function manually now.' });
    }

    res.send({ message: 'Event approved and scheduled successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to approve event.' });
  }
});


// Reject an event (only for admins)
router.delete('/reject-event-by-admin/:event_id', auth, async (req, res) => {
    const user = req.user;
    const { event_id } = req.params;
  
    if (user.role!== 'admin') {
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

  if (user.role!== 'admin') {
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

// Venue Utilization Report (only for admins)
router.get('/reports/venue-utilization', auth, async (req, res) => {
  const user = req.user;
  if (user.role !== 'admin') {
    return res.status(403).send({ error: 'Access denied. Only admins can view reports.' });
  }
  try {
    const [rows] = await db.query('SELECT * FROM venue_utilization_report');
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to fetch venue utilization report.' });
  }
});

// Finance Report (only for admins)
router.get('/reports/finance', auth, async (req, res) => {
  const user = req.user;
  if (user.role !== 'admin') {
    return res.status(403).send({ error: 'Access denied. Only admins can view reports.' });
  }
  try {
    const [rows] = await db.query('SELECT * FROM finance_report');
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to fetch finance report.' });
  }
});

// Participant Demographics Report (only for admins)
router.get('/reports/participant-demographics', auth, async (req, res) => {
  const user = req.user;
  if (user.role !== 'admin') {
    return res.status(403).send({ error: 'Access denied. Only admins can view reports.' });
  }
  try {
    const [rows] = await db.query('SELECT * FROM participant_demographics_report');
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to fetch participant demographics report.' });
  }
});

module.exports = router;