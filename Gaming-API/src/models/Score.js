import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema(
  {
    playerName: {
      type: String,
      required: [true, 'Player name is required'],
      trim: true,
    },
    score: {
      type: Number,
      required: [true, 'Score is required'],
      min: 0,
    },
  },
  { timestamps: true }
);

const Score = mongoose.model('Score', scoreSchema);
export default Score;
