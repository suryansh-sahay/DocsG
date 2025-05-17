const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter username'],
    unique: true, // Unique username
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password required'],
  },
  email: {
    type: String,
    required: true,
    unique: true,  
    validate: [isEmail, 'Please enter a valid email'],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
