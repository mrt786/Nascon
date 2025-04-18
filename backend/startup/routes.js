const home = require('../routes/home');
const error = require('../middleware/error');
const express = require('express');

module.exports = function(app) {
  app.use(express.json());
  app.use('/home', home);
  app.use('/auth', require('../routes/login_signup'));
  app.use('/accommodations', require('../routes/accommodations'));
  app.use('/venues', require('../routes/venues'));
  app.use(error);
};
