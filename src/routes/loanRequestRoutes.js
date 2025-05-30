// backend/src/routes/loanRequestRoutes.js
const express = require('express');
const LoanRequest = require('../models/LoanRequest');
const mongoose = require('mongoose');
const router = express.Router();

// Submit a loan request
router.post('/', async (req, res) => {
  const { personnelId, amount, reason, proposedDeductionPercentage } = req.body;
  const loanRequest = await LoanRequest.create({
    personnelId,
    amount,
    reason,
    proposedDeductionPercentage
  });
  res.json({ loanRequest });
});

// Get loan requests (optionally filter by personnelId)
router.get('/', async (req, res) => {
  try {
    const { personnelId } = req.query;
    let query = {};
    if (personnelId) query.personnelId = new mongoose.Types.ObjectId(personnelId);
    const requests = await LoanRequest.find(query);
    res.json({ requests });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve/decline a loan request
router.patch('/:id', async (req, res) => {
  const { status, approvedDeductionPercentage, approvedDuration, comments } = req.body;
  const loanRequest = await LoanRequest.findByIdAndUpdate(
    req.params.id,
    {
      status,
      approvedDeductionPercentage,
      approvedDuration,
      comments,
      reviewDate: new Date()
    },
    { new: true }
  );
  res.json({ loanRequest });
});

module.exports = router;