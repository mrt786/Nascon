const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// GET all events a judge is assigned to
router.get('/my-events', auth, async (req, res) => {
  const judgeId = req.user.id;

  if (req.user.role !== 'judge') {
    return res.status(403).send({ error: 'Access denied. Judges only.' });
  }

  try {
    const [events] = await db.query(
      `SELECT e.event_id, d.event_name, d.event_date, e.category
       FROM event_judges ej
       JOIN nascon_events e ON ej.event_id = e.event_id
       JOIN event_details d ON d.event_id = e.event_id
       WHERE ej.judge_id = ?`,
      [judgeId]
    );

    res.send(events);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Could not fetch judge events.' });
  }
});

// POST: Judge submits score for a participant or team in a specific round
router.post('/submit-score', auth, async (req, res) => {
  const judgeId = req.user.id;

  if (req.user.role !== 'judge') {
    return res.status(403).send({ error: 'Access denied. Judges only.' });
  }

  const { event_id, user_id, team_name, score, round, score_comment } = req.body;

  // Validate input
  const validRounds = ['prelims', 'semi-finals', 'finals'];
  if (!validRounds.includes(round)) {
    return res.status(400).send({ error: 'Invalid round provided.' });
  }

  if ((user_id && team_name) || (!user_id && !team_name)) {
    return res.status(400).send({ error: 'Provide either user_id (individual) or team_name, not both.' });
  }

  try {
    await db.query(
      `INSERT INTO scores (judge_id, event_id, user_id, team_name, score, score_comment, round)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [judgeId, event_id, user_id || null, team_name || null, score, score_comment, round]
    );

    res.send({ message: 'Score submitted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to submit score.' });
  }
});
