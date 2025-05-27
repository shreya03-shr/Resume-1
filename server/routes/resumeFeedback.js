import express from 'express';
import { calculateATSScore } from '../utils/atsScoringEngine.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { jobDescription, resumeSections } = req.body;

  if (!jobDescription || !resumeSections || !Array.isArray(resumeSections)) {
    return res.status(400).json({ error: 'jobDescription and resumeSections (array) required' });
  }

  // Combine all resume text for scoring
  const fullResumeText = resumeSections.map(s => s.content || '').join(' ');

  // Get ATS score + detailed feedback
  const { score, feedback } = calculateATSScore(fullResumeText, jobDescription, resumeSections);

  res.json({
    atsScore: score,
    feedback, // array of strings with detailed feedback
  });
});

export default router;
