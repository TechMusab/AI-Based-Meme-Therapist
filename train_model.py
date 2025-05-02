# train_model.py
import pandas as pd
from sklearn.model_selection import train_test_split
import pickle
from clean_text import clean_text
from naive_bayes import NaiveBayes  # ✅ your own class

# Step 1: Load Dataset
df = pd.read_csv('data/train.txt', sep=';', header=None, names=['text', 'emotion'])

# Step 2: Preprocess Text
df['clean_text'] = df['text'].apply(clean_text)

# Step 3: Split Dataset
X = df['clean_text']
y = df['emotion']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 4: Train your own Naive Bayes
model = NaiveBayes()
model.fit(X_train, y_train)

# Step 5: Test Accuracy
y_pred = model.predict(X_test)

accuracy = (y_pred == y_test).mean() * 100
print(f"Model Accuracy: {accuracy:.2f}%")

# Step 6: Save Model
with open('models/naive_bayes_model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("✅ Model saved successfully!")
