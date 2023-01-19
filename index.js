const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const path = require('path')
require('dotenv').config()
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to database :)");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname+'/routes/index.html'));
});
app.listen(3000, () => console.log(`listening on port ${3000}`));
