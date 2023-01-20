const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const path = require("path");
const restaurantRouter = require("./controllers/Restaurant");
const Register = require("./models/Register");
const Restaurant = require("./models/Restaurant");
require("dotenv").config();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/restaurant", restaurantRouter);
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to database :)");
});
app.get("/cuisines", (req, res) => {
  Restaurant.distinct("cuisine", (err, cuisines) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(cuisines);
    }
  });
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/routes/index.html"));
});
app.post("/login", (req, res) => {
  Register.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (isMatch) {
          return res.json({ message: "Success" });
        } else {
          return res.status(400).json({ message: "Incorrect password" });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
app.post("/register", (req, res) => {
  const newUser = new Register({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      newUser.password = hash;
      newUser
        .save()
        .then((user) => {
          res.json({ message: `${newUser.username} created successfully` });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    }
  });
});
app.listen(3000, () => console.log(`listening on port ${3000}`));
