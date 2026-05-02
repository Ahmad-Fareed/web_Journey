const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Route to fetch LeetCode data
app.post('/api/leetcode', async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        // GraphQL query
        const query = `
            query getUserStats($username: String!) {
                userPublicProfile(username: $username) {
                    username
                    realName
                    avatar
                    ranking
                    reputation
                    userStats {
                        totalSolved
                        totalQuestions
                        acRate
                    }
                    submitStats {
                        acSubmissionNum {
                            difficulty
                            count
                            submissions
                        }
                    }
                }
                matchedUser(username: $username) {
                    username
                    profile {
                        ranking
                        userAvatar
                        realName
                        countryCode
                        reputation
                    }
                    submissionCalendar
                    submitStats {
                        acSubmissionNum {
                            difficulty
                            count
                            submissions
                        }
                        totalSubmissionNum {
                            difficulty
                            count
                            submissions
                        }
                    }
                }
            }
        `;

        // Fetch from LeetCode API
        const response = await fetch('https://leetcode.com/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            body: JSON.stringify({
                query: query,
                variables: { username: username }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.errors) {
            return res.status(404).json({ error: result.errors[0].message || 'User not found' });
        }

        const userPublic = result.data.userPublicProfile;
        const matchedUser = result.data.matchedUser;

        if (!userPublic || !matchedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Send formatted data to frontend
        res.json({
            username: userPublic.username,
            realName: userPublic.realName,
            ranking: userPublic.ranking,
            reputation: userPublic.reputation,
            totalSolved: userPublic.userStats.totalSolved,
            totalQuestions: userPublic.userStats.totalQuestions,
            acRate: userPublic.userStats.acRate,
            submitStats: userPublic.submitStats.acSubmissionNum
        });

    } catch (error) {
        console.error('Error fetching from LeetCode:', error);
        res.status(500).json({ error: 'Failed to fetch LeetCode data: ' + error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 LeetMetric Server running at http://localhost:${PORT}`);
});
