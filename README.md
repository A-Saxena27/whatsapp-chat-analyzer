# WhatsApp Chat Analyzer 📊💬

## Project Description

WhatsApp Chat Analyzer is an interactive web application built using Python and Streamlit that analyzes exported WhatsApp chat data and generates meaningful insights, visualizations, and statistics.

The application supports both individual and group chats. Users can upload their exported WhatsApp chat files and instantly explore communication patterns, user activity, sentiment trends, word usage, emoji behavior, and much more through an intuitive dashboard.

The project combines data analysis, visualization, natural language processing (NLP), and machine learning concepts to transform raw chat data into actionable insights.

---

## Features

### Chat Statistics

- Total Messages
- Total Words
- Media Shared
- Links Shared

### Timeline Analysis

- Monthly Timeline
- Daily Timeline

### Activity Analysis

- Weekly Activity Distribution
- Monthly Activity Distribution
- Activity Heatmap

### User Analysis

- Most Active Users
- User Contribution Percentage

### NLP & Text Analysis

- Word Cloud Visualization
- Most Common Words
- Keyword Extraction

### Emoji Analysis

- Most Frequently Used Emojis
- Emoji Distribution Charts

### Link Analysis

- Most Shared Domains

### Sentiment Analysis

- Positive Messages
- Neutral Messages
- Negative Messages
- Sentiment Visualization

### Export Features

- Download Processed Chat Data as CSV

---

## Screenshots

### Dashboard Overview

Add screenshot here.

### Timeline Analysis

Add screenshot here.

### Word Cloud

Add screenshot here.

### Sentiment Analysis

Add screenshot here.

### Activity Heatmap

Add screenshot here.

---

## Tech Stack

### Frontend

- Streamlit

### Backend

- Python

### Data Processing

- Pandas
- NumPy

### Visualization

- Matplotlib
- Seaborn
- WordCloud

### NLP & Machine Learning

- TextBlob / VADER Sentiment Analysis
- Emoji Processing

### Utility Libraries

- URLExtract
- Collections Counter
- Regex

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/whatsapp-chat-analyzer.git

cd whatsapp-chat-analyzer
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

#### Windows

```bash
venv\Scripts\activate
```

#### Linux / Mac

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

## How to Run

Start the Streamlit application:

```bash
streamlit run app.py
```

The application will open automatically in your browser.

If it doesn't, visit:

```text
http://localhost:8501
```

---

## How to Export WhatsApp Chat

1. Open WhatsApp.
2. Open the desired chat.
3. Click Menu → More → Export Chat.
4. Choose "Without Media".
5. Save the exported .txt file.
6. Upload the file into the application.

---

## Project Structure

```text
whatsapp-chat-analyzer/
│
├── app.py
├── helper.py
├── preprocessor.py
├── stop_hinglish.txt
├── requirements.txt
├── README.md
├── sample_chat.txt
│
└── assets/
    ├── screenshots/
    └── logo.png
```

---

## Team Members

### Member 1

- Dashboard Development
- Data Visualization
- Activity Analysis
- Word Cloud
- User Interface
- Deployment

### Member 2

- Chat Parsing
- Timeline Processing
- Emoji Analysis
- Sentiment Analysis
- NLP Features
- Testing & Optimization

---

## Future Scope

- AI-Based Chat Summarization
- Relationship Analysis
- Conversation Topic Detection
- ChatGPT-Powered Insights
- Multi-language Sentiment Analysis
- Advanced User Behavior Analytics
- Export Reports as PDF
- WhatsApp Wrapped Style Annual Reports
- Interactive Plotly Dashboards
- Cloud Database Integration

---

## Learning Outcomes

Through this project, we explored:

- Data Cleaning and Preprocessing
- Natural Language Processing
- Sentiment Analysis
- Data Visualization
- Machine Learning Fundamentals
- Streamlit Web Application Development
- Collaborative Software Development using Git and GitHub

---

## License

This project is developed for educational and learning purposes.
