require('dotenv').config();  // Load environment variables from .env
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const config = require('config');
app.use(cors({ origin: 'http://localhost:5173' }));
require('./startup/db');            // Connect to MySQL
const seedAccommodations = require('./startup/accommodationsSeed');
require('./startup/routes')(app);   // Set up routes
// Enable CORS for all origins (or restrict it to your frontend)


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
