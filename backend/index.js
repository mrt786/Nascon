require('dotenv').config();  // Load environment variables from .env
const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const config = require('config');

require('./startup/db');            // Connect to MySQL
const seedAccommodations = require('./startup/accommodationsSeed');
require('./startup/routes')(app);   // Set up routes


// Run seeders after DB is ready
(async () => {
    try {
        await seedAccommodations();  // Seed accommodations if needed
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.error('Startup error:', err);
    }
})();

module.exports = app;
