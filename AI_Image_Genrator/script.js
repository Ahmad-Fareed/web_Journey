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

// --- API Configuration ---
// Important: Replace this with your actual Hugging Face API key
const HF_API_KEY = "PASTE_YOUR_HF_API_KEY_HERE";//copy it from huggingface.co/settings/tokens

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
 * 2. API Call Function
 * This function calls the Hugging Face API to generate an image.
 */
async function generateImage(prompt, model) {
    const randomSeed = Math.floor(Math.random() * 1000000); // Helps generate different images for the same prompt

    try {
        // Hugging Face's new Inference API endpoint (the old api-inference.huggingface.co was deprecated)
        const response = await fetch(`https://router.huggingface.co/hf-inference/models/${model}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${HF_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: { seed: randomSeed } // Send random seed for variety
            }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob); // Convert raw image blob to a local URL
    } catch (error) {
        console.error("Error generating image:", error);
        throw error;
    }
}

/**
 * 1. Form Submission Handler
 * This function triggers when the user clicks 'Generate'.
 * It prevents the page from reloading, grabs the user's input,
 * performs validation, and prepares the UI (gallery) with loading spinners.
 */
async function handleFormSubmit(e) {
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

    // Array to hold all our API requests
    const imagePromises = [];
    for (let i = 0; i < count; i++) {
        imagePromises.push(generateImage(prompt, model));
    }

    try {
        // Wait for ALL images to finish generating
        const imageUrls = await Promise.all(imagePromises);

        // Clear out the loading spinners
        gallery.innerHTML = '';

        // Inject the completed images into the HTML
        imageUrls.forEach((url, index) => {
            const card = document.createElement('div');
            card.classList.add('img-card');
            card.innerHTML = `
                <img src="${url}" class="result-img" alt="Generated AI Image ${index + 1}">
                <div class="img-overlay">
                    <a href="${url}" download="ai-generated-${Date.now()}-${index}.jpg" class="img-download-btn">
                        <i class="fa-solid fa-download"></i>
                    </a>
                </div>
            `;
            gallery.appendChild(card);
        });

    } catch (error) {
        // Handle errors gracefully on the UI
        gallery.innerHTML = `
            <div class="img-card error" style="grid-column: 1 / -1; width: 100%; aspect-ratio: auto; padding: 20px;">
                <div class="status-container">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <p style="font-size: 16px; margin-top: 10px;">Failed to generate images. Check API Key or try again.</p>
                </div>
            </div>
        `;
    } finally {
        // Re-enable the button when done (or if failed)
        generateBtn.disabled = false;
        generateBtn.innerHTML = '✨ Generate';
    }
}

// Attach the submit event listener to the form
generatorForm.addEventListener('submit', handleFormSubmit);