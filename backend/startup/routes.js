const home = require('../routes/home');
const error = require('../middleware/error');
const express = require('express');

module.exports = function(app) {
  app.use(express.json());
  app.use('/auth', require('../routes/login_signup'));
  app.use('/accommodations', require('../routes/accommodations'));
  app.use('/venues', require('../routes/venues'));
  app.use('/events', require('../routes/events'));
  app.use('/sponsors', require('../routes/sponsors'));
  app.use('/event-organizer', require('../routes/event_organizer'));
  app.use('/admin', require('../routes/admin'));
  app.use('/participant', require('../routes/participants'));
  app.use(error);
};
