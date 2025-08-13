import express from 'express';
import Score from '../models/Score.js';
import { authApiKey } from '../middleware/authApiKey.js';

const router = express.Router();

/**
 * GET /api/scores
 * Fetch all player scores
 */
router.get('/scores', authApiKey, async (req, res) => {
  try {
    const scores = await Score.find().sort({ updatedAt: -1 });
    res.status(200).json({ success: true, data: scores });
  } catch (error) {
    console.error('❌ Error fetching scores:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * POST /api/scores
 * Add or update a player's score
 */
router.post('/scores', authApiKey, async (req, res) => {
  try {
    const { playerName, score } = req.body;

    if (!playerName || typeof score !== 'number' || score < 0) {
      return res.status(400).json({ success: false, message: 'Invalid playerName or score. Score must be a positive number.' });
    }

    // Check if player exists
    const existingPlayer = await Score.findOne({ playerName });

    if (existingPlayer) {
      // Update score if it's higher than before
      if (score > existingPlayer.score) {
        existingPlayer.score = score;
        await existingPlayer.save();
        return res.status(200).json({ success: true, message: 'Score updated successfully', data: existingPlayer });
      } else {
        return res.status(200).json({ success: true, message: 'Current score is not higher than existing score', data: existingPlayer });
      }
    }

    // Create new score entry
    const newScore = new Score({ playerName, score });
    await newScore.save();

    res.status(201).json({ success: true, message: 'Score added successfully', data: newScore });
  } catch (error) {
    console.error('❌ Error saving score:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
