// backend/src/routes/overtimeRequestRoutes.js
const express = require('express');
const OvertimeRequest = require('../models/overtimeRequest');
const mongoose = require('mongoose');
const router = express.Router();

// Submit overtime request
router.post('/', async (req, res) => {
  const { personnelId, date, hours, reason } = req.body;
  const overtimeRequest = await OvertimeRequest.create({ personnelId, date, hours, reason });
  res.json({ overtimeRequest });
});

// Get overtime requests (optionally filter by personnelId)
router.get('/', async (req, res) => {
  const { personnelId } = req.query;
  let query = {};
  if (personnelId) query.personnelId = new mongoose.Types.ObjectId(personnelId);
  const requests = await OvertimeRequest.find(query);
  res.json({ requests });
});

// Approve/decline overtime request
router.patch('/:id', async (req, res) => {
  const { status, comments } = req.body;
  const overtimeRequest = await OvertimeRequest.findByIdAndUpdate(
    req.params.id,
    { status, comments, reviewDate: new Date() },
    { new: true }
  );
  res.json({ overtimeRequest });
});

module.exports = router;