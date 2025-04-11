const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../startup/db');
const config = require('config');

// Signup Route
router.post('/signup', async (req, res) => {
  const { fname, lname, contact_no, role, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  try {
    // Insert into users table
    const [result] = await db.query(
      'INSERT INTO users (fname, lname, email, contact_number, user_role, user_password) VALUES (?, ?, ?, ?, ?, ?)',
      [fname, lname, email, contact_no, role, hashed]
    );

    const userId = result.insertId;

    // Insert into role-specific table
    if (role === 'participant') {
      await db.query('INSERT INTO participants (user_id) VALUES (?)', [userId]);
    } else if (role === 'sponsor') {
      await db.query('INSERT INTO sponsors (sponsor_id) VALUES (?)', [userId]);
    } else if (role === 'judge') {
      await db.query('INSERT INTO judges (user_id) VALUES (?)', [userId]);
    }

    res.send({ message: `${role} registered successfully` });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length) return res.status(400).send({ error: 'Invalid email or password' });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.user_password);
    if (!valid) return res.status(400).send({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user.user_id, email: user.email, role: user.user_role }, config.get('jwtPrivateKey'));
    res.send({ token });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
