const CodingStats = require('../models/CodingStats');
const scraper = require('../services/codingPlatformScraper');

exports.getCodingStats = async (req, res) => {
  try {
    // Try to fetch fresh data from platforms
    const freshData = await scraper.fetchAllPlatformData();
    
    let stats = [];
    let totalProblems = 0;
    
    // Create stats array with fresh data or fallback
    const platforms = [
      {
        platform: 'leetcode',
        username: 'rajanayakdevops',
        stats: freshData.leetcode || {
          problemsSolved: 45,
          currentRating: 1200,
          maxRating: 1350,
          contestsParticipated: 8,
          badge: 'Knight'
        }
      },
      {
        platform: 'codechef',
        username: 'coderaja270119',
        stats: {
          problemsSolved: 32,
          currentRating: 1450,
          maxRating: 1520,
          contestsParticipated: 6,
          stars: 2,
          badge: '2 Star'
        }
      },
      {
        platform: 'codeforces',
        username: 'coderaja270119',
        stats: freshData.codeforces || {
          problemsSolved: 28,
          currentRating: 900,
          maxRating: 1100,
          contestsParticipated: 5,
          badge: 'Newbie'
        }
      }
    ];
    
    // Calculate total problems
    totalProblems = platforms.reduce((total, platform) => 
      total + platform.stats.problemsSolved, 0
    );
    
    res.json({
      platforms,
      totalProblems,
      lastUpdated: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCodingStats = async (req, res) => {
  try {
    const { platform } = req.params;
    const updateData = req.body;
    
    const stat = await CodingStats.findOneAndUpdate(
      { platform },
      { 
        stats: updateData,
        lastUpdated: new Date()
      },
      { new: true, upsert: true }
    );
    
    res.json(stat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};