import React, { useState } from 'react';
import './Account.css';

const Account = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }
    console.log('Password changed');
    setMessage('Password successfully changed!');
  };

  const handleLogout = () => {
    console.log('Logged out');
    setMessage('You have logged out!');
  };

  return (
    <div className="account-page">
      <div className="account-card">
        <h2>Account</h2>
        <div className="change-password">
          <h3>Change Password</h3>
          <label>Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handlePasswordChange}>Change Password</button>
        </div>
        <div className="logout">
          <button onClick={handleLogout}>Logout</button>
        </div>
        {message && <p className={message.includes('success') ? 'success' : 'error'}>{message}</p>}
      </div>
    </div>
  );
};

export default Account;