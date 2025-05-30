// backend/src/models/LoanRequest.js
const mongoose = require('mongoose');

const LoanRequestSchema = new mongoose.Schema({
  personnelId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  reason: { type: String, required: true },
  proposedDeductionPercentage: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'declined'], default: 'pending' },
  approvedDeductionPercentage: { type: Number },
  approvedDuration: { type: Number },
  requestDate: { type: Date, default: Date.now },
  reviewDate: { type: Date },
  comments: { type: String }
});

module.exports = mongoose.model('LoanRequest', LoanRequestSchema);