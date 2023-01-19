const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RegisterSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
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

module.exports = Register = mongoose.model('user', RegisterSchema);
