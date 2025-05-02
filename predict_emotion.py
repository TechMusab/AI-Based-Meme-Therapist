# predict_emotion.py

import pickle
from clean_text import clean_text

# Load model and vectorizer only once
with open('models/naive_bayes_model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('models/vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

def predict_emotion(text):
    # Clean input text
    text = clean_text(text)
    # Vectorize input
    text_vec = vectorizer.transform([text])
    # Predict emotion
    prediction = model.predict(text_vec)
    return prediction[0]
