import React, { useState } from 'react';
// import axios from 'axios';
import './signupPage.css'; // Import the CSS file

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    

  function handleSubmit(e){
     e.preventDefault();
     fetch('http://localhost:3002/signup', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "include",
      method: 'POST',
      body:JSON.stringify({username,password}),
    }).then(response => {
      if (response.status === 200) {
        return response.json()
      }
      else {
        console.log("some error")
      }
    })
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error)
      })
  }
 

  return (
    <div className="signup-container">
      <h1>Signup</h1>
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
