const express = require('express');
const router = express.Router();
const db = require('../startup/db');
const auth = require('../middleware/auth');



// Get all approved events (public), with optional venue info
router.get('/get-event-details', async (req, res) => {
  try {
    const [approvedEvents] = await db.query(
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
        v.venue_id,
        v.event_date AS venue_date,
        v.start_time,
        v.end_time
      FROM nascon_events e
      JOIN event_details d ON e.event_id = d.event_id
      LEFT JOIN event_venues v ON e.event_id = v.event_id
      WHERE d.approved = 1`
    );

    res.send(approvedEvents);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to fetch approved events.' });
  }
});



module.exports = router;
