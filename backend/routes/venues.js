const express = require('express');
const router = express.Router();
const db = require('../startup/db');
const auth = require('../middleware/auth')

// GET all venues
router.get('/', auth,async (req, res) => {
  try {
    const [venues] = await db.query('SELECT * FROM venues');
    res.status(200).json(venues);
  } catch (err) {
    console.error('[VENUES] Error fetching all venues:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET venue by ID
router.get('/:id',auth, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM venues WHERE venue_id = ?', [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Venue not found' });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('[VENUES] Error fetching venue by ID:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
