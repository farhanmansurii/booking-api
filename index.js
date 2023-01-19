const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const bcrypt = require('bcrypt')
const path = require('path')
const Register = require('./models/Register')
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
app.post("/register", (req,res)=>{
  const newUser = new Register({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      newUser.password = hash;
      newUser.save()
      .then(user => {
        res.json({ message: "User created successfully!" });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
    }})
})
app.listen(3000, () => console.log(`listening on port ${3000}`));
