const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Restaurant = require("../models/Restaurant");

// Get all restaurants
router.get("/", (req, res) => {
  Restaurant.find()
    .then((restaurants) => res.json(restaurants))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.get("/allcuisines", (req, res) => {
  Restaurant.distinct("cuisine", (err, cuisines) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(cuisines);
    }
  });
});

// Get a single restaurant
router.get("/:id", (req, res) => {
  Restaurant.findById(req.params.id)
    .then((restaurant) => res.json(restaurant))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Create a new restaurant
router.post("/", (req, res) => {
  const newRestaurant = new Restaurant({
    name: req.body.name,
    description: req.body.description,
    address: req.body.address,
    phone_number: req.body.phone_number,
    email: req.body.email,
    website: req.body.website,
    operating_hours: req.body.operating_hours,
    rating: req.body.rating,
    cuisine: req.body.cuisine,
  });

  newRestaurant
    .save()
    .then(() => res.json("Restaurant added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update a restaurant
router.put("/:id", (req, res) => {
  Restaurant.findById(req.params.id)
    .then((restaurant) => {
      restaurant.name = req.body.name;
      restaurant.description = req.body.description;
      restaurant.address = req.body.address;
      restaurant.phone_number = req.body.phone_number;
      restaurant.email = req.body.email;
      restaurant.website = req.body.website;
      restaurant.operating_hours = req.body.operating_hours;
      restaurant.rating = req.body.rating;
      (restaurant.cuisine = req.body.cuisine),
        restaurant
          .save()
          .then(() => res.json("Restaurant updated!"))
          .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete a restaurant
router.delete("/:id", (req, res) => {
  Restaurant.findByIdAndDelete(req.params.id)
    .then(() => res.json("Restaurant deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
