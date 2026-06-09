# 💬 WhatsApp Wrapped Analyzer

A modern WhatsApp Chat Analyzer that transforms exported WhatsApp chats into a personalized **WhatsApp Wrapped** experience inspired by Spotify Wrapped.

Users can upload a WhatsApp chat export and instantly receive interactive insights, statistics, relationship analytics, timelines, achievements, and compatibility metrics.

---

## ✨ Features

### 📊 Chat Statistics

* Total Messages
* Total Words
* Total Media Shared
* Total Links Shared
* Total Emoji Usage
* Favorite Emoji Detection

### ❤️ Relationship Insights

* Love Score Calculation
* Romantic Message Detection
* Green Flag Detection
* Red Flag Detection
* Achievement System
* Conversation Starter Analysis

### ⏱ Activity Analytics

* Response Time Analysis
* Most Active Time Detection
* Monthly Timeline
* Peak Activity Month

### ☁️ Content Analysis

* Top Words Detection
* Word Cloud Generation
* Emoji Analysis
* Chat Behaviour Metrics

### 🎨 Wrapped Experience

* Story-style card navigation
* Animated transitions
* Interactive wrapped cards
* Mobile-friendly UI
* WhatsApp-inspired design

---

## 🛠 Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios

### Backend

* Python
* Flask
* Flask-CORS
* Pandas
* Regex-based WhatsApp Parser

---

## 📂 Project Structure

```text
whatsapp-chat-analyzer/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── data/
│   │   └── types/
│   │
│   └── package.json
│
├── backend/
│   ├── app.py
│   ├── parser.py
│   ├── analyzer.py
│   ├── preprocessor.py
│   ├── helper.py
│   └── utils/
│
└── README.md
```

---

## 🚀 Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd whatsapp-chat-analyzer
```

---

### 2. Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install flask flask-cors pandas emoji
```

Run backend:

```bash
python app.py
```

Backend runs on:

```text
http://127.0.0.1:5000
```

---

### 3. Frontend Setup

```bash
cd frontend

npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 📱 How To Use

### Export WhatsApp Chat

On WhatsApp:

```text
Open Chat
↓
More Options
↓
Export Chat
↓
Without Media
↓
Save .txt file
```

---

### Analyze Chat

```text
Open Application
↓
Upload Chat
↓
Select WhatsApp .txt Export
↓
Generate Wrapped
↓
View Insights
```

---

## 📈 Current Analytics

Implemented:

* Message Count
* Word Count
* Media Count
* Link Count
* Favorite Emoji
* Monthly Timeline
* Peak Month Detection
* Love Score
* Response Time
* Romantic Message Detection
* Green Flags
* Red Flags
* Achievements
* Most Active Time
* Radar Metrics

---

## 🔮 Future Enhancements

* AI Generated Relationship Summary
* Sentiment Analysis
* Couple Compatibility Prediction
* Chat Streak Tracking
* PDF Report Generation
* Story Sharing
* Instagram Story Export
* Multi-language Support

---

## 👥 Team

Developed as a collaborative full-stack project using React + Flask.

---

## 📜 License

This project is for educational and research purposes.
