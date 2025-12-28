# 🌌 Cosmic.AI - Minimalist Astrology & Decision Compass

![Cosmic.AI Banner](https://img.shields.io/badge/Status-Active-purple?style=for-the-badge) ![Tech](https://img.shields.io/badge/Powered_by-Google_Gemini-blue?style=for-the-badge) ![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Cosmic.AI** is a modern, AI-powered astrology and numerology application designed to demystify celestial insights. By combining ancient Vedic principles with the generative power of the **Google Gemini API**, it provides grounded, actionable advice in a beautiful, "glassmorphism" interface.

> **Note:** This application operates as a minimalist, static web app using ES Modules and React. No complex build steps required.

---

## ✨ Key Features

### 🔮 1. Individual Analysis
Unlock your celestial blueprint based on Date, Time, and Place of birth.
- **Deep Insights:** Western Sun Sign, Vedic Moon Sign (Rashi), Nakshatra, and Numerology Root Number.
- **Personas:** Discover your unique **Spirit Animal** and **Pokemon Persona**.
- **Weekly Forecast:** Actionable "Dos" and "Avoids" for the week ahead.
- **Life Balance:** Visual planetary scores for Love, Career, Health, Family, and Spirituality.
- **Generative Art:** AI-generated visuals representing your cosmic energy.

### ❤️ 2. Synergy (Compatibility) Mode
Analyze the connection between two individuals.
- **Love Level & Score:** A calculated compatibility percentage.
- **Relationship Dynamics:** Elemental vibe, communication tips, and potential pitfalls.
- **Shared Luck:** Common lucky elements and "Couple's Weekly Forecast".

### 🧭 3. Decision Compass (New!)
A practical tool for timing and decision-making.
- **Traffic Light Verdict:** Get a **Green** (Go), **Yellow** (Caution), or **Red** (Wait) signal for specific decisions (Business, Move, Love, etc.).
- **Readiness Score:** 0-100 score based on current astrological transits (Moon Phase/Nakshatra).
- **Strategy:** Receive a "Best Action" (Proceed/Delay/Prepare) and a specific risk assessment.

### 🛠️ Utilities
- **Save Profile:** Persist your birth details locally so you don't have to re-type them.
- **Multi-Language:** Supports English, Hindi, Spanish, French, German, and Japanese.
- **Theme Support:** Beautiful Light and Dark modes.
- **Share & Print:** Export your readings as PDF or share the summary via text.

---

## 🛠️ Tech Stack

- **Frontend Library:** React 19 (via ES Modules)
- **Styling:** TailwindCSS (via CDN)
- **Icons:** Lucide React
- **AI Model:** Google Gemini 2.5 Flash & Pro (`@google/genai` SDK)
- **Architecture:** Client-side Static Application (No backend server required)

---

## 🚀 Getting Started

### Prerequisites
You need a **Google Gemini API Key** to run this application.
1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Create an API Key.
3. Keep it secure.

### 📦 Deployment (Recommended)

The easiest way to run this app is to deploy it to **Vercel**, as it requires secure environment variable injection for the API key.

1. **Fork/Clone** this repository.
2. Go to [Vercel](https://vercel.com) and create a new project.
3. Import your repository.
4. **Important:** In the Vercel Project Settings, add an Environment Variable:
   - Key: `API_KEY`
   - Value: `Your_Google_Gemini_API_Key`
5. Deploy! Vercel will detect it as a static site.

### 💻 Local Development

To run this locally, you need a simple static file server.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/cosmic-ai.git
   cd cosmic-ai





   Configure API Key:
Note: Since this is a static app without a bundler like Vite/Webpack in this specific configuration, process.env.API_KEY is usually replaced at build time or by the hosting provider.
For local testing, you may need to manually replace process.env.API_KEY in services/geminiService.ts with your actual key string (⚠️ DO NOT COMMIT YOUR KEY to GitHub).
Serve the app:
You can use Python, Node, or an extension like "Live Server" in VS Code.
code
Bash
# Using npx and serve
npx serve .
Open your browser to http://localhost:3000.
📂 Project Structure
code
Code
/
├── components/          # React UI Components
│   ├── InputForm.tsx    # User data entry & Profile saving
│   ├── LoadingView.tsx  # Animated loading state
│   └── ResultsView.tsx  # Displays Analysis, Compatibility, & Decision dashboards
├── services/
│   └── geminiService.ts # Logic for calling Google Gemini API & prompt engineering
├── App.tsx              # Main application controller & Layout
├── types.ts             # TypeScript interfaces and data models
├── index.html           # Entry point & Tailwind configuration
├── index.tsx            # React mounting point
└── metadata.json        # Project metadata
🤝 Contributing
Contributions are welcome!
Fork the project.
Create your feature branch (git checkout -b feature/AmazingFeature).
Commit your changes (git commit -m 'Add some AmazingFeature').
Push to the branch (git push origin feature/AmazingFeature).
Open a Pull Request.
⚠️ Disclaimer
Cosmic.AI is for entertainment and self-reflection purposes only.
The AI simulates an astrologer persona. It does not provide medical, legal, or financial advice. The "Decision Compass" assesses timing based on astrological logic but should not dictate life choices. Always use your own judgment.
📄 License
Distributed under the MIT License. See LICENSE for more information
