import express from 'express';
import Score from '../models/Score.js';
import { authApiKey } from '../middleware/authApiKey.js';

const router = express.Router();

// GET /api/leaderboard → Fetch all leaderboard entries (sorted by score descending)
router.get('/leaderboard', authApiKey, async (req, res) => {
  try {
    const leaders = await Score.find().sort({ score: -1 }).limit(10);
    res.status(200).json({ success: true, data: leaders });
  } catch (error) {
    console.error('❌ Error fetching leaderboard:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/leaderboard → Add a new score entry (same as scores but with different endpoint)
router.post('/leaderboard', authApiKey, async (req, res) => {
  try {
    const { playerName, score } = req.body;

    if (!playerName || typeof score !== 'number' || score < 0) {
      return res.status(400).json({ success: false, message: 'Invalid playerName or score' });
    }

    // Check if player exists
    const existingPlayer = await Score.findOne({ playerName });

    if (existingPlayer) {
      // Update score if it's higher than before
      if (score > existingPlayer.score) {
        existingPlayer.score = score;
        await existingPlayer.save();
        return res.status(200).json({ success: true, message: 'Score updated successfully' });
      } else {
        return res.status(200).json({ success: true, message: 'Current score is not higher than existing score' });
      }
    }

    // Create new score entry
    const newEntry = new Score({ playerName, score });
    await newEntry.save();

    res.status(201).json({ success: true, message: 'Score added successfully' });
  } catch (error) {
    console.error('❌ Error adding score:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
