const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('Authorization');

  if (!token)
    return res.status(401).send({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded; // Attach user info to request object
    next();
  } catch (ex) {
    res.status(400).send({ error: 'Invalid token.' });
  }
};