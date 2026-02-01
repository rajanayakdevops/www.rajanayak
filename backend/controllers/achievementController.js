const Achievement = require('../models/Achievement');

// Get all achievements
const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single achievement
const getAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }
    res.json(achievement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create achievement
const createAchievement = async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    await achievement.save();
    res.status(201).json(achievement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update achievement
const updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }
    res.json(achievement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete achievement
const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }
    res.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAchievements,
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement
};