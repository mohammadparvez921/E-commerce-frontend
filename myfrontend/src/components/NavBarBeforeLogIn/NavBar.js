import React from 'react'
import { Dropdown } from 'react-bootstrap';
import    {Link} from 'react-router-dom'






function NavBar() {
  return (
    <div>

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          MyCart
        </Link>

        <div className="navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/mycart" className="nav-link">
                My Cart
              </Link>
            </li>
            <li className="nav-item">
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  Login/Signup
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item  as={Link} to="/login">
                  
                    Login
                  </Dropdown.Item>
                  <Dropdown.Item  as={Link} to="/signup">
                  
                    Signup
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
        
        
    </div>
  )
}

export default NavBar