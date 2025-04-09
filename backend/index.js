require('dotenv').config();  // Load environment variables from .env
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const config = require('config');

require('./startup/db');            // Connect to MySQL
require('./startup/routes')(app);   // Set up routes

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
