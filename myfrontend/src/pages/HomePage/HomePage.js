import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from '../../components/NavBarBeforeLogIn/NavBar';
import LogInPage from '../LogInPage/LogInPage';
import './HomePage.css'; 

export default function HomePage() {
  return (
         <div className='homepage'>
       
            <NavBar className="navbar" />
            <LogInPage className="loginpage"/>
    
        </div>
  );
}
