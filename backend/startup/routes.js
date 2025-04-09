const home = require('../routes/home');
const error = require('../middleware/error');
const express = require('express');

module.exports = function(app) {
  app.use(express.json());
  app.use('/home', home);
  app.use(error);
};
