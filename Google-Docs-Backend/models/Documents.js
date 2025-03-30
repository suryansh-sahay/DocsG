const mongoose = require('mongoose');

// Define the Document Schema
const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  // Add any other fields you need for your documents
});

// Create the Document model
const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
