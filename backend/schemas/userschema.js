const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define user
const userSchema = new mongoose.Schema({
  name: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true },
  credit: { type: Number, require: true},
  chosenList: { type: [String], default: [] }
});

// Login
userSchema.statics.authenticate = async function(email, password) {
  try {
    const user = await this.findOne({ email: email});
    if(!user) {
      return res.status(404).json({message: 'No such user'})
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      return res.status(401).json({message: 'Wrong password'})
    }

    return user;

  } catch (error) {
      return res.json({message: 'Some error'})
  }
};

// Hash passowrd
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if(err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
})

module.exports = mongoose.model('User', userSchema);