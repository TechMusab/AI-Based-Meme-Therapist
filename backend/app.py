import random
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from predict_emotion import predict_emotion  # Assuming you have this function available

app = Flask(__name__)
CORS(app)

# Function to load memes from memes.txt
def load_memes():
    memes = {}
    try:
        # Get the current directory where app.py is located
        current_dir = os.path.dirname(os.path.abspath(__file__))
        memes_file_path = os.path.join(current_dir, 'memes.txt')
        
        # Load memes from the file
        with open(memes_file_path, 'r') as file:
            for line in file:
                if ':' in line:
                    emotion, meme = line.strip().split(":", 1)
                    emotion = emotion.strip().lower()
                    meme = meme.strip()
                    
                    # Append the meme to the corresponding emotion list
                    if emotion in memes:
                        memes[emotion].append(meme)
                    else:
                        memes[emotion] = [meme]
    except FileNotFoundError:
        print(f"Error: {memes_file_path} not found.")
    except Exception as e:
        print(f"Error loading memes: {e}")
    
    return memes

# Load memes into a dictionary when the server starts
memes = load_memes()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the text data from the frontend
        data = request.get_json()
        text = data.get('text', '')  # Expecting 'text' to be present

        if not text:
            return jsonify({'error': 'No text provided!'}), 400  # Send a proper error message if no text is provided

        # Predict the emotion using the predict_emotion function
        emotion = predict_emotion(text).lower()  # Make sure the emotion is in lowercase
        print(f"Predicted Emotion: {emotion}")

        # Select a random meme based on emotion
        if emotion in memes:
            meme = random.choice(memes[emotion])  # Send the meme text (not URL)
            print(meme)
            return jsonify({'meme': meme, 'emotion': emotion})  # Return both meme text and emotion
        else:
            return jsonify({'error': 'Emotion not found!'}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
