import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Resume from '../models/Resume.js';

const router = express.Router();

// Create a new resume
router.post('/', protect, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newResume = new Resume({
      user: req.user._id,
      title: title.trim(),
      content: {},
    });

    await newResume.save();

    res.status(201).json(newResume);
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
