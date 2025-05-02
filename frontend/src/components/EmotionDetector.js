import React, { useState } from 'react';
import axios from 'axios';
import { FaHome, FaCog, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './EmotionDetector.css';

const EmotionDetector = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);

  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const mic = recognition ? new recognition() : null;

  const handlePredict = async () => {
    if (!text.trim()) return;

    try {
      console.log("Sending request with text:", text);
      const response = await axios.post('http://localhost:5000/predict', { text });

      if (response.data.error) {
        console.error('Error from backend:', response.data.error);
      } else {
        const { meme, emotion } = response.data;
        setMessages(prev => [...prev, { user: text, bot: emotion, meme, feedback: null }]);
        setText('');
      }
    } catch (error) {
      console.error('Prediction error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    }
  };

  const handleFeedback = (index, value) => {
    setMessages(prevMessages => {
      const updated = [...prevMessages];
      updated[index].feedback = value;
      return updated;
    });

    // Optional: send to backend for logging
    // axios.post('http://localhost:5000/feedback', { messageIndex: index, feedback: value });
  };

  const handleMic = () => {
    if (!mic) {
      alert('Speech Recognition not supported!');
      return;
    }

    mic.start();
    setListening(true);

    mic.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      mic.stop();
      setListening(false);
    };

    mic.onerror = (event) => {
      console.error('Mic error:', event.error);
      mic.stop();
      setListening(false);
    };

    mic.onend = () => {
      setListening(false);
    };
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePredict();
    }
  };

  return (
    <div className="emotion-page">
      {/* Navbar */}
      <div className="navbar">
        <Link to="/" className="navbar-item active">
          <FaHome />
          <span>Home</span>
        </Link>
        <Link to="/settings" className="navbar-item">
          <FaCog />
          <span>Settings</span>
        </Link>
        <Link to="/account" className="navbar-item">
          <FaUser />
          <span>Account</span>
        </Link>
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        {messages.length === 0 && (
          <div className="welcome-message">
            Good to see you, Zahra.
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className="message-pair">
            <div className="user-message">{msg.user}</div>
            <div className="bot-response">
              <div>Emotion: {msg.bot}</div>
              {msg.meme && <div className="meme-text">{msg.meme}</div>}
              
              {/* Feedback Section */}
              {!msg.feedback && (
                <div className="feedback-section">
                  <span>Was this meme helpful?</span>
                  <button onClick={() => handleFeedback(index, 'yes')}>👍</button>
                  <button onClick={() => handleFeedback(index, 'no')}>👎</button>
                </div>
              )}
              {msg.feedback && (
                <div className="feedback-thanks">
                  Thanks for your feedback: <strong>{msg.feedback}</strong>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="input-area">
        <button onClick={handleMic} className="mic-button">
          🎙️
        </button>
        <input
          type="text"
          placeholder={listening ? "Listening..." : "Type your feelings..."}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handlePredict} className="send-button">
          ➤
        </button>
      </div>
    </div>
  );
};

export default EmotionDetector;
