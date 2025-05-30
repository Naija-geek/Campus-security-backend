// backend/src/models/OvertimeRequest.js
const mongoose = require('mongoose');

const OvertimeRequestSchema = new mongoose.Schema({
  personnelId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  hours: { type: Number, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'declined'], default: 'pending' },
  reviewDate: { type: Date },
  comments: { type: String }
});

module.exports = mongoose.model('OvertimeRequest', OvertimeRequestSchema);