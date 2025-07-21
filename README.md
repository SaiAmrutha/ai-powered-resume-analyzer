# 🚀 AI-Powered Resume Analyzer

An AI-based web app that helps job seekers optimize their resumes by analyzing job descriptions and suggesting targeted improvements — all powered by Google Gemini API.

## ✨ Features

✅ Upload Resume (.pdf, .docx)
✅ Paste Job Description
✅ Match Score Calculator — smartly evaluates how well your resume aligns with the JD
✅ AI Suggestions from Gemini API to improve your resume
✅ Compare View — visually compare original vs AI-improved resume
✅ Download as PDF — with custom naming & contextual headers (date, job title)
✅ Copy Suggestions — instantly copy AI text to clipboard
✅ Tooltip for Match Score — explains how the score is calculated
✅ Resume History — with filters, sorting, bulk delete, JD preview on hover
✅ Insights Dashboard with charts:
📈 Match Score Over Time
📏 Resume Length vs Match Score
🔍 Top Missing Keywords
✅ Dark Mode Toggle 🌙
✅ Responsive UI — mobile-friendly experience
✅ Clean Landing Page — with "Let’s Get Started" CTA

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
  `bash export const GEMINI_API_KEY = "your-api-key";`
  `bash npm start `

## Why It Stands Out

Unlike generic resume builders, this app:

💡 Gives personalized, AI-driven resume suggestions

📊 Visualizes resume trends with insightful charts

🔁 Allows real-time comparison between original & improved resumes

⚡ Works completely client-side — no backend, no authentication needed

🎯 Built from scratch — no templates or tutorials, just pure learning and execution

- Match Score Calculator — smartly evaluates how well your resume aligns with the JD
- AI Suggestions from Gemini API to improve your resume
- Compare View — visually compare original vs AI-improved resume
- Download as PDF — with custom naming & contextual headers (date, job title)
- Copy Suggestions — instantly copy AI text to clipboard
- Tooltip for Match Score — explains how the score is calculated
- Resume History — with filters, sorting, bulk delete, JD preview on hover
- Insights Dashboard with charts:
- 📈 Match Score Over Time
- 📏 Resume Length vs Match Score
- 🔍 Top Missing Keywords
- Dark Mode Toggle 🌙
- Responsive UI — mobile-friendly experience
- Clean Landing Page — with "Let’s Get Started" CTA
