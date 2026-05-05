// ===========================
// Theme Toggle
// ===========================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Apply saved theme preference (defaults to light)
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

    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// ===========================
// API Configuration
// ===========================
// Get your free API key from: https://huggingface.co/settings/tokens
const HF_API_KEY = "PASTE_YOUR_HF_API_KEY_HERE";
const HF_API_BASE = "https://router.huggingface.co/hf-inference/models";

// ===========================
// DOM Elements
// ===========================
const generatorForm = document.getElementById('generatorForm');
const promptInput = document.getElementById('promptInput');
const modelSelect = document.getElementById('modelSelect');
const countSelect = document.getElementById('countSelect');
const ratioSelect = document.getElementById('ratioSelect');
const gallery = document.getElementById('gallery');
const generateBtn = document.getElementById('generateBtn');

// ===========================
// API Call — Generate a Single Image
// ===========================
/**
 * Sends a text prompt to the Hugging Face Inference API
 * and returns a local object URL pointing to the generated image.
 *
 * @param {string} prompt - The text description of the image to generate.
 * @param {string} model  - The Hugging Face model ID (e.g. "black-forest-labs/FLUX.1-schnell").
 * @returns {Promise<string>} A blob object URL that can be used as an <img> src.
 */
async function generateImage(prompt, model) {
    const randomSeed = Math.floor(Math.random() * 1000000);

    const response = await fetch(`${HF_API_BASE}/${model}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${HF_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            inputs: prompt,
            parameters: { seed: randomSeed },
        }),
    });

    if (!response.ok) {
        const errorBody = await response.text().catch(() => "");
        throw new Error(`API Error ${response.status}: ${response.statusText}. ${errorBody}`);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
}

// ===========================
// Form Submission Handler
// ===========================
/**
 * Validates user input, shows loading spinners, fires parallel
 * API requests for the requested image count, and renders results
 * or an error message into the gallery.
 */
async function handleFormSubmit(e) {
    e.preventDefault();

    // Collect input values
    const prompt = promptInput.value.trim();
    const model = modelSelect.value;
    const count = parseInt(countSelect.value) || 1;
    const ratio = ratioSelect.value || '1/1';

    // Validation
    if (!prompt) {
        alert("Please enter a prompt to generate images.");
        return;
    }
    if (!model) {
        alert("Please select a model.");
        return;
    }

    // Show loading spinners
    gallery.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const card = document.createElement('div');
        card.classList.add('img-card', 'loading');
        card.innerHTML = `<div class="spinner"></div>`;
        gallery.appendChild(card);
    }

    // Lock the generate button
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';

    // Fire all API requests in parallel
    const imagePromises = Array.from({ length: count }, () =>
        generateImage(prompt, model)
    );

    try {
        const imageUrls = await Promise.all(imagePromises);

        // Replace spinners with generated images
        gallery.innerHTML = '';
        imageUrls.forEach((url, index) => {
            const card = document.createElement('div');
            card.classList.add('img-card');
            card.innerHTML = `
                <img src="${url}" class="result-img" alt="Generated image ${index + 1}">
                <div class="img-overlay">
                    <a href="${url}" download="ai-generated-${Date.now()}-${index}.jpg" class="img-download-btn">
                        <i class="fa-solid fa-download"></i>
                    </a>
                </div>
            `;
            gallery.appendChild(card);
        });
    } catch (error) {
        console.error("Generation failed:", error);
        gallery.innerHTML = `
            <div class="img-card error">
                <div class="status-container">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <p>Failed to generate images. Check your API key or try again.</p>
                </div>
            </div>
        `;
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = '✨ Generate';
    }
}

// ===========================
// Init
// ===========================
generatorForm.addEventListener('submit', handleFormSubmit);