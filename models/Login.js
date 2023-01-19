const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = Login = mongoose.model('login', LoginSchema);
