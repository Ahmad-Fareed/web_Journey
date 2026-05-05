// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    const isDarkMode = body.classList.contains('dark-mode');
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// --- DOM Elements ---
const generatorForm = document.querySelector('.generator-form');
const promptInput = document.querySelector('.prompt-input');
const customSelects = document.querySelectorAll('.custom-select');
// Mapping the selects based on their order in the HTML
const modelSelect = customSelects[0];
const countSelect = customSelects[1];
const ratioSelect = customSelects[2];
const gallery = document.getElementById('gallery');
const generateBtn = document.querySelector('.generate-btn');

/**
 * 1. Form Submission Handler
 * This function triggers when the user clicks 'Generate'.
 * It prevents the page from reloading, grabs the user's input,
 * performs validation, and prepares the UI (gallery) with loading spinners.
 */
function handleFormSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Get and trim user input values
    const prompt = promptInput.value.trim();
    const model = modelSelect.value;
    const count = parseInt(countSelect.value) || 1; // Default to 1 if not selected
    const ratio = ratioSelect.value || '1/1'; // Default to Square if not selected

    // Basic Validation: Ensure prompt and model are provided
    if (!prompt) {
        alert("Please enter a prompt to generate images.");
        return;
    }
    if (!model) {
        alert("Please select a model.");
        return;
    }

    // Clear previous results from the gallery
    gallery.innerHTML = '';

    // Create loading cards based on the selected image count
    for (let i = 0; i < count; i++) {
        const card = document.createElement('div');
        card.classList.add('img-card', 'loading');
        // Add a spinner from the style.css
        card.innerHTML = `<div class="spinner"></div>`;
        gallery.appendChild(card);
    }

    // Disable the generate button to prevent duplicate requests
    generateBtn.disabled = true;
    generateBtn.innerHTML = 'Generating...';

    console.log("Inputs validated. Ready to call API with:", { prompt, model, count, ratio });
    
    // TODO: In the next step, we will call the API here.
    // For now, let's re-enable the button after a delay to simulate an API request.
    setTimeout(() => {
        generateBtn.disabled = false;
        generateBtn.innerHTML = '✨ Generate';
    }, 2000);
}

// Attach the submit event listener to the form
generatorForm.addEventListener('submit', handleFormSubmit);