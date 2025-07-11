# 💼 AI-Powered Resume Analyzer (Frontend-Only with Gemini)

A smart, React-based web app that helps job seekers evaluate and improve their resumes based on any job description using Google's Gemini AI.

## 🔍 What It Does

✨ Upload your resume (PDF or DOCX)  
🧠 Extracts text from your resume using PDF.js  
📝 Accepts a job description from any source  
📊 Calculates a dynamic **match score** based on skill relevance  
🤖 Sends resume + JD to **Gemini Pro API** to get AI-powered suggestions  
📈 Displays tailored, structured, improvement-focused resume feedback

All on the frontend. No backend needed.

---

## 🧰 Tech Stack

- **React 18**
- **Tailwind CSS**
- **Gemini Pro API** (Google Generative AI)
- **pdf.js** (Client-side PDF parsing)
- **Custom Hooks** for reusable logic
- **dotenv** for secure API key handling

---

## 💡 Key Features

- 🔐 Secure resume file upload with validation (`.pdf`, `.docx`)
- 📎 Drag & Drop powered by `react-dropzone`
- 📉 Real-time match score calculated from job/resume similarity
- 💬 Resume suggestions generated by **Gemini AI**
- 📋 Clear UI sections for:
  - Match Score
  - Extracted Resume Text
  - Gemini’s Feedback
- 🧠 Gemini prompts engineered to follow best resume writing practices (quantified impact, STAR method, ATS compatibility)
- 🔧 Modular utility functions for score calculation and PDF text extraction

---

## 🚀 How to Run Locally

```bash
git clone https://github.com/SaiAmrutha/ai-powered-resume-analyzer
cd resume-analyzer
npm install
```

# Create a .env file:

GEMINI_API_KEY=your_google_ai_api_key

# Run the app:

npm start

# Future Enhancements

- Add download button for revised resume

- Add login with Firebase (for auth + saving history)

- Allow side-by-side comparison: original vs Gemini suggested
