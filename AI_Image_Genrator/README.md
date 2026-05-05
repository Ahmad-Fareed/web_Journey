# ✨ AI Image Generator

A sleek, modern web application that generates AI-powered images from text prompts using the Hugging Face Inference API. Built with vanilla HTML, CSS, and JavaScript — no frameworks needed.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Hugging Face](https://img.shields.io/badge/Hugging%20Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)

---

## 🚀 Features

- **AI-Powered Image Generation** — Generate stunning images from text descriptions using state-of-the-art AI models.
- **Multiple AI Models** — Choose between FLUX.1 Schnell (fast) and Stable Diffusion 3 Medium.
- **Batch Generation** — Generate 1 to 4 images simultaneously from a single prompt.
- **Aspect Ratio Control** — Select Square (1:1), Landscape (16:9), or Portrait (9:16) layouts.
- **Dark / Light Mode** — Toggle between themes with preference saved to localStorage.
- **One-Click Download** — Download any generated image instantly with a single click.
- **Responsive Design** — Fully responsive UI that works on desktop, tablet, and mobile.
- **Loading States** — Smooth spinner animations while images are being generated.
- **Error Handling** — Graceful error messages when API calls fail.

---

## 📸 Screenshots

| Light Mode | Dark Mode |
|:---:|:---:|
| ![Light Mode](img/light-preview.png) | ![Dark Mode](img/dark-preview.png) |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Page structure and semantic markup |
| **CSS3** | Styling, animations, dark mode, and responsive layout |
| **Vanilla JavaScript** | DOM manipulation, API calls, and event handling |
| **Hugging Face Inference API** | AI image generation backend |
| **Font Awesome 6** | Download button icons |

---

## ⚡ Getting Started

### Prerequisites

- A modern web browser (Chrome, Edge, Firefox, Safari)
- A free [Hugging Face](https://huggingface.co/) account
- A code editor (VS Code recommended)
- Live Server extension (optional, for local development)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/AI-Image-Generator.git
cd AI-Image-Generator
```

### 2. Get Your Hugging Face API Key

1. Sign up at [huggingface.co](https://huggingface.co/).
2. Go to **Settings** → **Access Tokens**.
3. Click **Create new token** (Fine-grained).
4. Under **Inference**, check ✅ **"Make calls to Inference Providers"**.
5. Generate and copy the token.

### 3. Add Your API Key

Open `script.js` and replace the placeholder on line 25:

```javascript
const HF_API_KEY = "hf_YOUR_API_KEY_HERE";
```

### 4. Run the Project

Open `index.html` in your browser, or use **Live Server** in VS Code for hot-reloading:

1. Right-click `index.html` → **Open with Live Server**
2. The app will open at `http://127.0.0.1:5500`

---

## 📁 Project Structure

```
AI_Image_Generator/
├── index.html          # Main HTML structure
├── style.css           # All styles, themes, animations & responsive design
├── script.js           # Core logic: theme toggle, API calls, DOM updates
├── img/                # Image assets
└── README.md           # Project documentation
```

---

## 🔧 How It Works

1. **User Input** — The user types a text prompt describing the image they want.
2. **Model Selection** — The user picks an AI model from the dropdown.
3. **Validation** — JavaScript validates the prompt and model selection.
4. **Loading UI** — Spinner cards are injected into the gallery grid.
5. **API Request** — A `POST` request is sent to the Hugging Face Inference API (`router.huggingface.co`).
6. **Image Processing** — The API returns raw image data (Blob), which is converted to a local object URL.
7. **Display** — The generated images are rendered in the gallery with download buttons.

---

## 🤖 Available Models

| Model | Speed | Quality | Description |
|---|---|---|---|
| **FLUX.1 Schnell** | ⚡ Fast | High | Latest generation model by Black Forest Labs |
| **Stable Diffusion 3 Medium** | 🕐 Medium | High | StabilityAI's latest open-weight model |

---

## ⚠️ Important Notes

- **API Key Security**: The API key is stored in the frontend JavaScript. This is fine for personal/demo projects but should **never** be done in production. For production, use a backend proxy server.
- **Rate Limits**: The free Hugging Face inference API has rate limits. If you get errors, wait a few seconds and try again.
- **Model Availability**: Hugging Face may deprecate or add models over time. Check the [HF Inference docs](https://huggingface.co/docs/api-inference/) for the latest available models.

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgments

- [Hugging Face](https://huggingface.co/) — For providing the free Inference API
- [Font Awesome](https://fontawesome.com/) — For the icon library
- [Black Forest Labs](https://blackforestlabs.ai/) — For the FLUX.1 model
- [Stability AI](https://stability.ai/) — For the Stable Diffusion model

---

<p align="center">
  Made by Ahmad Fareed
</p>
