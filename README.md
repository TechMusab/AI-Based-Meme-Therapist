# 🤖 AI-Based Meme Therapist

An AI-powered virtual companion that listens to your thoughts, detects your emotions, and responds with comforting or humorous meme-style messages. Whether you're feeling sad, angry, or joyful—this app's got a meme for that!

## 🎯 Purpose

This project aims to combine emotional intelligence with a touch of humor using AI. It detects a user's emotion from text or speech and responds with a relevant, pre-written meme phrase, acting like a light-hearted, AI-driven therapist.

## 🔍 Features

- 🎤 **Voice Input**: Speak your mind using the mic (Web Speech API).
- ✍️ **Text Input**: Type your feelings directly into the chat.
- 🤯 **Emotion Detection**: Machine Learning model classifies emotion from user input.
- 😂 **Meme Response**: Displays a meme-style text based on detected emotion.
- 🌐 **Modern Web UI**: Built with React for a smooth user experience.

## 🧠 Emotions Supported

- Joy
- Sadness
- Anger
- Fear
- Love
- Surprise

## 🛠️ Tech Stack

| Component   | Technology              |
|-------------|--------------------------|
| Frontend    | React, Axios, React Router |
| Backend     | Flask (Python)          |
| ML Model    | Trained with Scikit-learn |
| Voice Input | Web Speech API          

## 🚀 How to Run the Project

```bash
cd backend
python app.py
This will start the Flask server at:
http://localhost:5000

cd frontend  
npm install  
npm start
This will start the React app at:
http://localhost:3000
