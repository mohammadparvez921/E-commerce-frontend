import React from "react";
import "./App.css";
// import axios from "axios";
import SignupPage from "./pages/SignupPage/SignupPage";
function App() {
  

  // useEffect(() => {
  //   fetch('http://localhost:3002/message', {
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     credentials: "include",
  //     method: 'GET',
  //   }).then(response => {
  //     if (response.status === 200) {
  //       return response.json()
  //     }
  //     else {
  //       console.log("some error")
  //     }
  //   })
  //     .then(data => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }, []);

  return (
    <div className="App">
     <SignupPage/>
    </div>
  );
}

export default App