// server/routes/atsScore.js

import express from 'express';
import { calculateATSScore } from '../utils/atsScoringEngine.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: 'Both resumeText and jobDescription are required.' });
  }

  const result = calculateATSScore(resumeText, jobDescription);
  return res.json(result);
});

export default router;
