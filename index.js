const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

require('dotenv').config()
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json())



app.get("/", (req, res) => {
  res.send("Hi , Welcome to the Hotel API");
});
app.listen(3000, () => console.log("listening on port 5000"));
