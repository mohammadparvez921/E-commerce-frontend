import React, { useState } from 'react';
import './logInPage.css';

const LogInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sucessAlert,setsucessAlert]=useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        
        setsucessAlert('Sucessfully loggedin!')
        console.log('Authentication successful');
      } else {
        setError(responseData.error || 'Incorrect email or Password');
      }
    } catch (error) {
      console.error(error);
      setError('incorrect email or password');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <div className="error">{error}</div>}
      {sucessAlert && <div style={{color:"rgb(0, 100, 0)"}} className="sucessAlert">{sucessAlert}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LogInPage;
