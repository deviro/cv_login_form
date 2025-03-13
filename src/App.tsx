import React, { useState } from 'react';
import './App.css';
import { LinedBackground } from './components/linedBackground';

function App() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setError('Invalid email address');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 2000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({
      email: '',
      password: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setError('');

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="App">
      <LinedBackground />

      {isLoggedIn ? (
        <div className="successContainer">
          <h1 className="formTitle">Welcome back!</h1>
          <button onClick={handleLogout} className="primaryBtn">Logout</button>
        </div>
      ) : ( 
        <div className="loginContainer">
            <form onSubmit={handleSubmit} className="loginForm">
              <h1 className="formTitle">CV Login Form</h1>
              <div className="formGroup">
                <label className="formLabel" htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="inputField"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="mail@example.com"
                  />
              </div>
              <div className="formGroup">
                <label className="formLabel" htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="inputField"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder=""
                  />
              </div>
              {error && <span className="errorTitle">{error}</span>}
              {isLoading 
              ? (
                <span className="formTitle">Loading...</span>
              ) 
              : (
                <button type="submit" className="primaryBtn" disabled={isLoading}>
                  Login
                </button>
              )}
            </form>
        </div>
      )}
    </div>
  );
}

export default App;
