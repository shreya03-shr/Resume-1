import express from 'express';
import { calculateATSScore } from '../utils/atsScoringEngine.js';

const router = express.Router();

router.post('/score', (req, res) => {
  const { resumeText, jobDescription, resumeSections } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const result = calculateATSScore(resumeText, jobDescription, resumeSections || []);
  res.json(result);
});

export default router;
