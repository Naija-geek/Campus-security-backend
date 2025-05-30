// backend/src/routes/personnelRoutes.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
  const personnel = await User.find({ role: 'personnel' });
  for (const person of personnel) {
    if (person.isOnLeave && person.leaveEndDate && new Date(person.leaveEndDate) < new Date()) {
      person.isOnLeave = false;
      person.isActive = true;
      person.leaveEndDate = null;
      await person.save();
    }
  }
  res.json({ personnel });
});

module.exports = router;