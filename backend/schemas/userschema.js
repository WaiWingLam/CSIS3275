const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //  Password stored as plain text (not secure)
    balance: { type: Number, require: true}

  });
  
  module.exports = mongoose.model('User', userSchema);