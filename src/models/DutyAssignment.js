// backend/src/models/DutyAssignment.js
const mongoose = require('mongoose');

const dutyAssignmentSchema = new mongoose.Schema({
  personnelId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dutyPostId: { type: mongoose.Schema.Types.ObjectId, ref: 'DutyPost', required: true },
  startDate: Date,
  endDate: Date,
  shifts: [String],
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // manager
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DutyAssignment', dutyAssignmentSchema);