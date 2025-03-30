const mongoose = require('mongoose');
const {isEmail} = require('validator')
// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'please enter username'],
    unique: [false,'username required'], // Ensure usernames are unique
    trim: true,   // Trim whitespace from the beginning and end
  },
  password: {
    type: String,
    required: [false,'password required'],
  },
  email: {
    type: String,
    required: false,
    validate:[isEmail,'Please enter valid email']
    // unique: true, // Ensure email addresses are unique
  },
  verified : {
    type: Boolean,
    default : false,
  },
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document', // Reference to the Document model
  }],
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
