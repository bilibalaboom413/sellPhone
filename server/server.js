const express = require('express');

// Load .env
require("dotenv").config();

const app = express();
const port = 5000;

app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
});

// Routes
app.get('/helloworld', (req, res) => {
    res.send({ express: 'Your express backend is connected to react.'});
});

module.exports = app;
