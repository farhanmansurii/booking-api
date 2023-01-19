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

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to DB");
});

app.get("/", (req, res) => {
  res.send("Hi , Welcome to the Hotel API");
});
app.listen(3000, () => console.log("listening on port 5000"));
