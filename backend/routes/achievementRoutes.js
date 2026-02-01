const express = require('express');
const router = express.Router();
const {
  getAchievements,
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement
} = require('../controllers/achievementController');

// GET /api/achievements - Get all achievements
router.get('/', getAchievements);

// GET /api/achievements/:id - Get single achievement
router.get('/:id', getAchievement);

// POST /api/achievements - Create new achievement
router.post('/', createAchievement);

// PUT /api/achievements/:id - Update achievement
router.put('/:id', updateAchievement);

// DELETE /api/achievements/:id - Delete achievement
router.delete('/:id', deleteAchievement);

module.exports = router;