// Get DOM elements
const userInput = document.getElementById('user-input');
const searchBtn = document.getElementById('search-btn');
const statsContainer = document.querySelector('.stats-container');
const additionalStats = document.querySelector('.additional-stats');

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
        statsContainer.innerHTML = `<p style="color: #ef4444; font-weight: 600; grid-column: 1/-1;">❌ Error: ${error.message}</p>`;
        throw error;
    } finally {
        searchBtn.textContent = 'Search';
        searchBtn.disabled = false;
    }
}

// Function to show stats sections
async function showStats() {
    const username = userInput.value.trim();
    
    if (username) {
        try {
            console.log('Fetching data for user:', username);
            // Fetch data from LeetCode API
            const data = await fetchLeetCodeData(username);
            
            // Add visible class to show sections with animation
            statsContainer.classList.add('visible');
            additionalStats.classList.add('visible');
            
            console.log('Data fetched for user:', username, data);
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
