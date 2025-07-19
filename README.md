# 🚀 AI-Powered Resume Analyzer

An AI-based web app that helps job seekers optimize their resumes by analyzing job descriptions and suggesting targeted improvements — all powered by Google Gemini API.

## ✨ Features

- 📄 Upload Resume (PDF/DOCX)
- 📝 Paste Job Description
- 📊 AI-generated suggestions to improve resume match
- ✅ Match Score calculator
- 📎 Resume vs JD comparison view
- 📥 Download Suggestions as PDF
- 📂 Resume History with sorting, filtering & bulk delete
- 📈 Insights Dashboard with charts:
  - Match Score over Time
  - Resume Length vs Score
  - Top missing keywords
- 🔍 Hover preview for long job descriptions
- 🧭 Clean landing page with “Let’s Get Started” CTA

## 🛠 Tech Stack

- **Frontend:** React 18, TailwindCSS
- **AI Integration:** Gemini API (Google Generative Language)
- **PDF Handling:** `@react-pdf/renderer`
- **Charts:** Recharts
- **State Management:** React Hooks + Local Storage

## 📦 Local Setup

```bash
git clone https://github.com/SaiAmrutha/ai-powered-resume-analyzer.git
cd ai-powered-resume-analyzer
npm install
```

- Add your Gemini API Key in utils/constants.js:
  export const GEMINI_API_KEY = "your-api-key";
  npm start

## Why It Stands Out

Unlike generic resume builders, this app:

- Offers smart AI-powered suggestions based on job descriptions
- Gives recruiters-style match scoring
- Helps you visually compare original vs AI-improved resumes
- Turns resume data into actionable charts and insights
- Requires no backend or auth — quick and easy!
