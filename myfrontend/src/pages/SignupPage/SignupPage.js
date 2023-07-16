import React, { useState } from 'react';
// import axios from 'axios';
import './signupPage.css'; // Import the CSS file

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
    

  function handleSubmit(e){
     e.preventDefault();
     fetch('http://localhost:3002/signup', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "include",
      method: 'POST',
      body:JSON.stringify({username,password,email}),
    }).then(response => {
      if (response.status === 200) {
        return response.json()
      }
      else {
        setError('Email registered already')
        console.log("some error")
      }
    })
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error)
      })
      setEmail('');
      setError('');
      setPassword('');
      setUsername('');
  }
 

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      {error && <div style={{color:'red'}} className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br/>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
