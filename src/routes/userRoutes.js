// backend/src/routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// GET /api/users?role=personnel|manager|admin (or all users if no role)
router.get('/', async (req, res) => {
  try {
    const { role } = req.query;
    let query = {};
    if (role) {
      query.role = role;
    }
    const users = await User.find(query);
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get the authenticated user's information
router.get('/me', async (req, res) => {
  try {
    // If you use sessions:
    const userId = req.session?.userId;
    // If you use JWT, use: const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: 'Not authenticated' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a user
router.patch('/:id', async (req, res) => {
  try {
    const { name, contact, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, contact, email },
      { new: true }
    );
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a user's password
router.patch('/:id/password', async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.password = password; // hash if needed
    await user.save();
    res.json({ message: 'Password updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;