# test_prediction.py

from predict_emotion import predict_emotion

print("=== Emotion Detection Tester ===")
print("Type a sentence to predict the emotion. Type 'exit' to quit.\n")

while True:
    text = input("Enter a statement: ")
    if text.lower() == 'exit':
        print("Goodbye!")
        break
    emotion = predict_emotion(text)
    print(f"Predicted Emotion: {emotion}\n")
