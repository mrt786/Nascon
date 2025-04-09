const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('./startup/db');            // connect to MySQL
require('./startup/routes')(app); // setup routes

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});

module.exports = app;
