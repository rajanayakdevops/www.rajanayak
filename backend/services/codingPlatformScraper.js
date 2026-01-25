const axios = require('axios');
const cheerio = require('cheerio');

class CodingPlatformScraper {
  
  // Fetch LeetCode data
  async fetchLeetCodeData(username) {
    try {
      const graphqlQuery = {
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              username
              submitStats: submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }
              profile {
                ranking
                userAvatar
                realName
                aboutMe
                school
                websites
                countryName
                company
                jobTitle
                skillTags
                postViewCount
                postViewCountDiff
                reputation
                reputationDiff
                solutionCount
                solutionCountDiff
                categoryDiscussCount
                categoryDiscussCountDiff
              }
            }
          }
        `,
        variables: { username }
      };

      const response = await axios.post('https://leetcode.com/graphql', graphqlQuery, {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      const data = response.data.data.matchedUser;
      if (!data) return null;

      const totalSolved = data.submitStats.acSubmissionNum
        .reduce((total, item) => total + item.count, 0);

      return {
        username,
        problemsSolved: totalSolved,
        ranking: data.profile.ranking || 0,
        reputation: data.profile.reputation || 0
      };
    } catch (error) {
      console.error('LeetCode fetch error:', error.message);
      return null;
    }
  }

  // Fetch Codeforces data
  async fetchCodeforcesData(username) {
    try {
      const userInfoResponse = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
      const userInfo = userInfoResponse.data.result[0];
      
      const submissionsResponse = await axios.get(`https://codeforces.com/api/user.status?handle=${username}`);
      const submissions = submissionsResponse.data.result;
      
      // Count unique solved problems
      const solvedProblems = new Set();
      submissions.forEach(submission => {
        if (submission.verdict === 'OK') {
          solvedProblems.add(`${submission.problem.contestId}-${submission.problem.index}`);
        }
      });

      return {
        username,
        problemsSolved: solvedProblems.size,
        currentRating: userInfo.rating || 0,
        maxRating: userInfo.maxRating || 0,
        badge: userInfo.rank || 'Unrated'
      };
    } catch (error) {
      console.error('Codeforces fetch error:', error.message);
      return null;
    }
  }

  // Fetch all platform data
  async fetchAllPlatformData() {
    const results = {};
    
    try {
      // Fetch LeetCode data
      const leetcodeData = await this.fetchLeetCodeData('rajanayakdevops');
      if (leetcodeData) {
        results.leetcode = {
          ...leetcodeData,
          badge: 'Knight'
        };
      }

      // Fetch Codeforces data
      const codeforcesData = await this.fetchCodeforcesData('coderaja270119');
      if (codeforcesData) {
        results.codeforces = codeforcesData;
      }

      return results;
    } catch (error) {
      console.error('Error fetching platform data:', error);
      return {};
    }
  }
}

module.exports = new CodingPlatformScraper();