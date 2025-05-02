# naive_bayes.py
import math
from collections import defaultdict
from scipy.sparse import csr_matrix

class NaiveBayes:
    def __init__(self):
        self.classes = None
        self.class_counts = None
        self.word_counts = None
        self.vocab = set()
        self.total_words = None

    def fit(self, X, y):
        """
        Fit the Naive Bayes model on the training data
        """
        self.classes = set(y)
        self.class_counts = defaultdict(int)
        self.word_counts = {c: defaultdict(int) for c in self.classes}
        self.total_words = defaultdict(int)

        for text, label in zip(X, y):
            self.class_counts[label] += 1
            words = text.split()
            for word in words:
                self.word_counts[label][word] += 1
                self.vocab.add(word)
                self.total_words[label] += 1

    def predict(self, X):
        """
        Predict the class for each input in X.
        """
        results = []
        
        if isinstance(X, csr_matrix):  # Check if X is a sparse matrix
            X = X.toarray()  # Convert to dense array
            X = [' '.join([word for word, idx in zip(self.vocab, row) if idx > 0]) for row in X]  # Convert back to text

        for text in X:
            words = text.split()  # Now text is a string
            class_probs = {}

            for c in self.classes:
                # Start with log prior probability
                log_prob = math.log(self.class_counts[c] / sum(self.class_counts.values()))
                
                for word in words:
                    word_freq = self.word_counts[c][word]
                    word_prob = (word_freq + 1) / (self.total_words[c] + len(self.vocab))  # Laplace smoothing
                    log_prob += math.log(word_prob)
                
                class_probs[c] = log_prob

            best_class = max(class_probs, key=class_probs.get)
            results.append(best_class)

        return results
