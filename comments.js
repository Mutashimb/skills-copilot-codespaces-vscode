//create web server
const express = require('express');
const app = express();

//get comments
app.get('/comments', (req, res) => {
  res.json([
    { id: 1, body: "some comment" },
    { id: 2, body: "other comment" }
  ]);
});

//export web server
module.exports = app;