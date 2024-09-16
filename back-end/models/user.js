const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});


userSchema.methods.comparePassword = function(candidatePassword, cb) {
  const isMatch = candidatePassword === this.password;
  cb(null, isMatch);
};

module.exports = mongoose.model('User', userSchema);
