const express = require('express');
const router = express.Router();
const db = require('../startup/db');
const auth = require('../middleware/auth');

// Send event for approval (only for event organizers)
router.post('/send-event-for-approval', auth, async (req, res) => {
  const { category, event_name, event_date, registration_fee, current_round, rules, event_description, max_participants } = req.body;
  const user = req.user;

  if (user.role !== 'event_organizer') {
    return res.status(403).send({ error: 'Access denied. Only event organizers can send events for approval.' });
  }

  if (!category || !event_name || !event_date || !registration_fee || !current_round || !max_participants) {
    return res.status(400).send({ error: 'All required fields must be provided.' });
  }

  try {
    const [nasconResult] = await db.query(
      'INSERT INTO nascon_events (category, user_id) VALUES (?, ?)',
      [category, user.id]
    );
    const event_id = nasconResult.insertId;

    await db.query(
      `INSERT INTO event_details 
      (event_id, event_name, event_date, registration_fee, current_round, rules, event_description, max_participants) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [event_id, event_name, event_date, registration_fee, current_round, rules || '', event_description || '', max_participants]
    );

    res.send({ message: 'Event sent for approval.', event_id });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to send event for approval.' });
  }
});

// View all events organized by current user with venue and timing
router.get('/my-events', auth, async (req, res) => {
    const user = req.user;
  
    if (user.role !== 'event_organizer') {
      return res.status(403).send({ error: 'Access denied. Only event organizers can view their events.' });
    }
  
    try {
      const [events] = await db.query(
        `SELECT 
           e.event_id,
           d.event_name,
           d.event_date AS scheduled_date,
           d.registration_fee,
           d.current_round,
           d.approved,
           v.venue_id,
           vn.name AS venue_name,
           ev.event_date AS venue_date,
           ev.start_time,
           ev.end_time
         FROM nascon_events e
         JOIN event_details d ON e.event_id = d.event_id
         LEFT JOIN event_venues ev ON e.event_id = ev.event_id
         LEFT JOIN venues vn ON ev.venue_id = vn.venue_id
         WHERE e.user_id = ?`,
        [user.id]
      );
  
      res.send(events);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Failed to fetch events.' });
    }
  });
  
  
  // Add sponsorship packages to an event
  router.post('/add-sponsorship-packages', auth, async (req, res) => {
    const { event_id, sponsorships } = req.body; // sponsorships: [{ sponsor_level, sponsor_amount }, ...]
    const user = req.user;
  
    if (user.role !== 'event_organizer') {
      return res.status(403).send({ error: 'Access denied. Only event organizers can add sponsorships.' });
    }
  
    if (!event_id || !Array.isArray(sponsorships) || sponsorships.length === 0) {
      return res.status(400).send({ error: 'Event ID and sponsorship levels must be provided.' });
    }
  
    try {
      // Verify the event belongs to the organizer
      const [eventCheck] = await db.query(
        'SELECT * FROM nascon_events WHERE event_id = ? AND user_id = ?',
        [event_id, user.id]
      );
  
      if (eventCheck.length === 0) {
        return res.status(403).send({ error: 'You can only add sponsorships to your own events.' });
      }
  
      for (const { sponsor_level, sponsor_amount } of sponsorships) {
        if (!sponsor_level || !sponsor_amount || sponsor_amount <= 0) {
          return res.status(400).send({ error: 'Each sponsorship entry must include a valid sponsor_level and sponsor_amount > 0.' });
        }
  
        await db.query(
          `INSERT INTO event_sponsorship_packages (event_id, sponsor_level, sponsor_amount)
           VALUES (?, ?, ?)
           ON DUPLICATE KEY UPDATE sponsor_amount = VALUES(sponsor_amount)`,
          [event_id, sponsor_level, sponsor_amount]
        );
      }
  
      res.send({ message: 'Sponsorship packages added successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Failed to add sponsorship packages.' });
    }
  });

  // Get specific event details by event_id (only for event organizers)
router.get('/event/:event_id', auth, async (req, res) => {
    const { event_id } = req.params;
    const user = req.user;
  
    if (user.role !== 'event_organizer') {
      return res.status(403).send({ error: 'Access denied. Only event organizers can view event details.' });
    }
  
    try {
      const [rows] = await db.query(
        `SELECT ne.event_id, ne.category, ed.event_name, ed.event_date, ed.registration_fee, 
                ed.current_round, ed.rules, ed.event_description, ed.max_participants, ed.approved
         FROM nascon_events ne
         JOIN event_details ed ON ne.event_id = ed.event_id
         WHERE ne.event_id = ? AND ne.user_id = ?`,
        [event_id, user.id]
      );
  
      if (rows.length === 0) {
        return res.status(404).send({ error: 'Event not found or not created by this organizer.' });
      }
  
      res.send(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Failed to fetch event details.' });
    }
  });
  

// Get total sponsor amount for a specific event
router.get('/event-sponsor-amount/:eventId', auth, async (req, res) => {
  const user = req.user;
  const eventId = req.params.eventId;

  if (user.role !== 'event_organizer') {
    return res.status(403).send({ error: 'Access denied. Only event organizers can access sponsor amounts.' });
  }

  try {
    // First, ensure the event belongs to the current user
    const [ownership] = await db.query(
      'SELECT * FROM nascon_events WHERE event_id = ? AND user_id = ?',
      [eventId, user.id]
    );

    if (ownership.length === 0) {
      return res.status(403).send({ error: 'You do not have access to this event.' });
    }

    // Call the SQL function
    const [result] = await db.query(
      'SELECT get_event_sponsor_ammount(?) AS total_sponsor_amount',
      [eventId]
    );

    res.send({ event_id: eventId, sponsor_amount: result[0].total_sponsor_amount });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to fetch sponsor amount.' });
  }
});

// Get sponsor income report for all approved events by current event organizer
router.get('/sponsor-income-report', auth, async (req, res) => {
    const user = req.user;
  
    if (user.role !== 'event_organizer') {
      return res.status(403).send({ error: 'Access denied. Only event organizers can access sponsor reports.' });
    }
  
    try {
      // Fetch all approved events by this organizer
      const [events] = await db.query(
        `SELECT e.event_id, e.category, d.event_name, d.event_date, d.max_participants
         FROM nascon_events e
         JOIN event_details d ON e.event_id = d.event_id
         WHERE e.user_id = ? AND d.approved = 1`,
        [user.id]
      );
  
      // Add sponsor amount for each event
      for (let event of events) {
        const [sponsor] = await db.query(
          'SELECT get_event_sponsor_ammount(?) AS sponsor_amount',
          [event.event_id]
        );
        event.sponsor_amount = sponsor[0].sponsor_amount || 0;
      }
  
      res.send({ organizer_id: user.id, events });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Failed to generate sponsor income report.' });
    }
  });
  


module.exports = router;