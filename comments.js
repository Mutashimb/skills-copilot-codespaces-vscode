//Create web Server
const express = require("express");
const app = express();
//Create a port
const port = 3000;
//Create a route
app.get("/comments", (req, res) => {
  res.send("Post Comments Here");
});
//Listen to the port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});