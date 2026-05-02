// Get DOM elements
const userInput = document.getElementById('user-input');
const searchBtn = document.getElementById('search-btn');
const statsContainer = document.querySelector('.stats-container');
const additionalStats = document.querySelector('.additional-stats');
const errorContainer = document.getElementById('error-container');

// Get progress circle elements
const easyProgressCircle = document.getElementById('progress-1');
const mediumProgressCircle = document.getElementById('progress-2');
const hardProgressCircle = document.getElementById('progress-3');

// Get labels
const easyLabel = easyProgressCircle.querySelector('.circle-percentage');
const mediumLabel = mediumProgressCircle.querySelector('.circle-percentage');
const hardLabel = hardProgressCircle.querySelector('.circle-percentage');

// Get cards container
const cardStatsContainer = document.querySelector('.stats-cards');

// Function to show error
function showError(message) {
    errorContainer.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    errorContainer.style.display = 'block';
}

// Function to hide error
function hideError() {
    errorContainer.style.display = 'none';
}

async function fetchLeetCodeData(username) {
    try {
        searchBtn.textContent = 'Searching...';
        searchBtn.disabled = true;

        // CORS proxy and target URL
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = 'https://leetcode.com/graphql/';

        // Create headers
        const myHeaders = new Headers();
        myHeaders.append('content-type', 'application/json');

        // GraphQL query
        const graphql = JSON.stringify({
            query: `
                query userSessionProgress($username: String!) {
                    allQuestionsCount {
                        difficulty
                        count
                    }
                    matchedUser(username: $username) {
                        username
                        profile {
                            ranking
                            reputation
                        }
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
            `,
            variables: { username: `${username}` }
        });

        // Request options
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: graphql
        }; 

        // Fetch data
        const response = await fetch(proxyUrl + targetUrl, requestOptions);
        
        if (!response.ok) {
            throw new Error('Unable to fetch user details');
        }

        const parsedData = await response.json();
        console.log('Fetched data:', parsedData);

        return parsedData;

    } catch (error) {
        console.error('Error fetching LeetCode data:', error);
        showError(error.message);
        throw error;
    } finally {
        searchBtn.textContent = 'Search';
        searchBtn.disabled = false;
    }
}

// Function to update progress circle
function updateProgress(solved, total, label, circle) {
    const progressDegree = (solved / total) * 100;
    const circumference = 2 * Math.PI * 54; // radius is 54
    const offset = circumference - (progressDegree / 100) * circumference;
    
    circle.querySelector('.progress-ring-circle').style.strokeDashoffset = offset;
    label.textContent = `${progressDegree.toFixed(1)}%`;
}

// Function to display user data
function displayUserData(parsedData) {
    try {
        // Clear any previous errors
        hideError();

        // Check for GraphQL errors
        if (parsedData.errors && parsedData.errors.length > 0) {
            throw new Error(parsedData.errors[0].message || 'API Error');
        }

        // Check if matchedUser exists
        if (!parsedData.data || !parsedData.data.matchedUser) {
            throw new Error('User not found or profile is private');
        }

        // Check if submitStats exists
        if (!parsedData.data.matchedUser.submitStats) {
            throw new Error('No submission data available for this user');
        }

        const totalQues = parsedData.data.allQuestionsCount[0].count;
        const totalEasyQues = parsedData.data.allQuestionsCount[1].count;
        const totalMediumQues = parsedData.data.allQuestionsCount[2].count;
        const totalHardQues = parsedData.data.allQuestionsCount[3].count;

        const solvedTotalQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;
        const solvedTotalEasyQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const solvedTotalMediumQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const solvedTotalHardQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;

        // Update progress circles
        updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);

        // Update individual stats cards
        const card1 = document.querySelector('#card-1 .card-value');
        const card2 = document.querySelector('#card-2 .card-value');
        const card3 = document.querySelector('#card-3 .card-value');

        if (card1) card1.textContent = solvedTotalQues;
        if (card2) card2.textContent = solvedTotalEasyQues;
        if (card3) card3.textContent = solvedTotalMediumQues;

        // Extract ranking and reputation from profile
        const ranking = parsedData.data.matchedUser.profile?.ranking || 'N/A';
        const reputation = parsedData.data.matchedUser.profile?.reputation || 0;

        // Update additional stats
        const rankingElement = document.getElementById('ranking');
        const contributionElement = document.getElementById('contribution');
        const reputationElement = document.getElementById('reputation');
        const companyTagsElement = document.getElementById('company-tags');

        if (rankingElement) rankingElement.textContent = ranking !== 'N/A' ? `#${ranking}` : 'N/A';
        if (contributionElement) contributionElement.textContent = solvedTotalQues;
        if (reputationElement) reputationElement.textContent = reputation;
        if (companyTagsElement) companyTagsElement.textContent = '0';

        // Prepare cards data for logging
        const cardsData = [
            { label: 'Total Solved', value: solvedTotalQues },
            { label: 'Easy Solved', value: solvedTotalEasyQues },
            { label: 'Medium Solved', value: solvedTotalMediumQues },
            { label: 'Hard Solved', value: solvedTotalHardQues }
        ];

        console.log('Cards data:', cardsData);
        console.log('Ranking:', ranking, 'Reputation:', reputation);
        console.log('Data successfully displayed!');

    } catch (error) {
        console.error('Error displaying user data:', error);
        showError(error.message);
    }
}

// Function to show stats sections
async function showStats() {
    const username = userInput.value.trim();
    
    if (username) {
        try {
            // Clear previous errors
            hideError();
            
            console.log('Fetching data for user:', username);
            // Fetch data from LeetCode API
            const data = await fetchLeetCodeData(username);
            
            // Add visible class to show sections with animation
            statsContainer.classList.add('visible');
            additionalStats.classList.add('visible');
            
            // Display user data
            displayUserData(data);
            
            console.log('Data displayed for user:', username);
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        alert('Please enter a username');
    }
}

// Event listener for search button
searchBtn.addEventListener('click', showStats);

// Allow Enter key to trigger search
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        showStats();
    }
});

// Optional: Hide stats if input is cleared
userInput.addEventListener('input', (e) => {
    if (e.target.value.trim() === '') {
        statsContainer.classList.remove('visible');
        additionalStats.classList.remove('visible');
    }
});
