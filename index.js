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
app.use(express.json());app.listen(5000, () => console.log("listening on port 5000"));

mongoose.connect(process.env.MONGODB).then(()=>console.log("Database is connected"))


app.get("/", (req, res) => {
  res.send("Hi , Welcome to the Hotel API");
});
app.listen(3000, () => console.log("listening on port 5000"));
