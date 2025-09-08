# 🧠 AI-Powered Meeting Summarizer

## 📌 Project Overview
The **AI-Powered Meeting Summarizer** is a web application designed to convert audio recordings of meetings into concise, actionable summaries. Utilizing advanced speech-to-text and natural language processing technologies, this tool enables users to quickly extract key points, decisions, and action items from their meetings.

---

## ⚙️ Features
- **Audio-to-Text Conversion**: Transcribes meeting audio recordings into text.
- **Summarization**: Generates concise summaries highlighting key points and action items.
- **Translation**: Supports translation of non-English audio to English.
- **Interactive Interface**: Built using Gradio for a user-friendly experience.
- **Model Flexibility**: Supports multiple Whisper models and various summarization models via Ollama.

---

## 🛠️ Technologies Used
- **Backend**: Python
- **Speech-to-Text**: `whisper.cpp`
- **Summarization**: Ollama large language models
- **Web Interface**: Gradio
- **Translation**: Whisper for non-English to English translation

---

## 📂 Project Structure
AI-Powered-Meeting-Summarizer/<br>
│<br>
├── main.py # Main application logic<br>
├── requirements.txt # Python dependencies<br>
├── run_meeting_summarizer.sh # Script to run the application<br>
└── README.md # Project documentation<br>
