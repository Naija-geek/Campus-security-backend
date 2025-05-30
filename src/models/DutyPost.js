const mongoose = require('mongoose');

const DutyPostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  description: String,
  // Add other fields as needed
}, { timestamps: true });

module.exports = mongoose.model('DutyPost', DutyPostSchema);