import React, { useState } from 'react';
import './settings.css';

const Settings = () => {
  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState('light');

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    console.log(`Language changed to: ${e.target.value}`);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    console.log(`Theme changed to: ${newTheme}`);
  };

  return (
    <div className="settings-page">
      <div className="settings-card">
        <h2>Settings</h2>
        <div className="setting-option">
          <label>Language</label>
          <select value={language} onChange={handleLanguageChange}>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>
        <div className="setting-option">
          <label>Theme</label>
          <button onClick={toggleTheme}>
            {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;