const mongoose = require('mongoose');

const codingStatsSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: ['leetcode', 'codechef', 'codeforces']
  },
  username: {
    type: String,
    required: true
  },
  stats: {
    problemsSolved: { type: Number, default: 0 },
    currentRating: { type: Number, default: 0 },
    maxRating: { type: Number, default: 0 },
    globalRank: { type: Number, default: 0 },
    contestsParticipated: { type: Number, default: 0 },
    stars: { type: Number, default: 0 },
    badge: { type: String, default: '' }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CodingStats', codingStatsSchema);