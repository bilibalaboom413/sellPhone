const express = require('express');
const { process_params } = require('express/lib/router');

// Load .env
require("dotenv").config();

const app = express();
const port = 5000;

app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
});

// Routes
app.get('/helloworld', (req, res) => {
    res.send("Hello word");
});

module.exports = app;
