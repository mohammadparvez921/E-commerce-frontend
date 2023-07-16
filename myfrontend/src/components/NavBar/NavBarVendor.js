import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import './NavBarVendor.css';

const NavBarVendor = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          MyCart
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/mycart" className="nav-link">
                My Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/addproduct" className="nav-link">
                Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="category-dropdown">
                  Category
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/gogin">Grocery</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/electronics">Electronics</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item">
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="sort-dropdown">
                  Sort By
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/sortprice">Price</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBarVendor;
