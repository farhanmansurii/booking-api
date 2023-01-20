const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const shortid = require('shortid');
const slugify = require('slugify');

const restaurantSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    address: {
        type: String,

    },
    phone_number: String,
    email: String,
    website: String,
    operating_hours: [{
        day: String,
        open: String,
        close: String
    }],
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    reviews: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        text: String,
        rating: Number
    }],
    "images": [String],
    "menus": [{
        "name": String,
        "items": [{
            "name": String,
            "description": String,
            "price": Number
        }]
    }],
    "capacity": Number,
    "location": {
        "type": {
            "type": String,
            "default": "Point"
        },
        "coordinates": [Number]
    },
    "cuisine": String,
    "price_range": Number,
    "payment_methods": [String],
    "amenities": [String],
    "created_at": {
        "type": Date,
        "default": Date.now
    },
    "updated_at": {
        "type": Date,
        "default": Date.now
    }
});

restaurantSchema.pre('save', function(next) {
    this._id = slugify(this.name, { lower: true });
    next();
});

restaurantSchema.plugin(uniqueValidator);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
