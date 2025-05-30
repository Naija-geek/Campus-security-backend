// backend/src/routes/dutyPostRoutes.js
const express = require('express');
const router = express.Router();
const DutyPost = require('../models/DutyPost');

// Create a new duty post
router.post('/', async (req, res) => {
  try {
    const { name, location, description, priority } = req.body;
    const post = await DutyPost.create({ name, location, description, priority });
    res.json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all duty posts
router.get('/', async (req, res) => {
  const posts = await DutyPost.find();
  res.json({ posts });
});

module.exports = router;