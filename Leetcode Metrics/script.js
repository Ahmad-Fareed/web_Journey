// Get DOM elements
const userInput = document.getElementById('user-input');
const searchBtn = document.getElementById('search-btn');
const statsContainer = document.querySelector('.stats-container');
const additionalStats = document.querySelector('.additional-stats');

async function fetchLeetCodeData(username) {
    try {
        searchBtn.textContent = 'Loading...';
        searchBtn.disabled = true;

        // Fetch from local Node.js backend
        const response = await fetch('http://localhost:3000/api/leetcode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.error) {
            throw new Error(result.error);
        }

        console.log('Fetched data:', result);
        return result;

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
