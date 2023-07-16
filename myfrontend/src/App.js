import React from "react";
import "./App.css";
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'

// import axios from "axios";
import SignupPage from "./pages/SignupPage/SignupPage";
import LogInPage from "./pages/LogInPage/LogInPage";
// import AddProductForm from "./pages/AddProduct/AddProuctForm";
import ProductList from "./pages/ProductList/ProductList";
// import EditPage from "./pages/EditPage/EditPage";
import HomePage from "./pages/HomePage/HomePage";
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
     {/* <SignupPage/> */}
     {/* <LogInPage/> */}
     {/* <AddProductForm/> */}
    
      
      {/* <ProductList/> */}

      
      <div className="App">
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </nav> */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/productList" element={<ProductList />} />
        </Routes>
      </div>
 
   
      
   
    </div>




  );
}

export default App