const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator');
const RegisterSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        return validator.isEmail(value);
      },
      message: "Please enter a valid email address"
    }
  },
  password: {
    type: String,
    required: true
  },
  isAdmin :{
    type: Boolean,
    default : false
  }
});
RegisterSchema.pre('save', function (next) {
  const user = this;
  if (!validator.isLength(user.password, { min: 8 })) {
    next(new Error('Password must be at least 8 characters long'));
  } else {
    next();
  }
});
module.exports = Register = mongoose.model('user', RegisterSchema);
