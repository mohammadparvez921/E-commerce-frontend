
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import './DashBoard.css'

function DashBoard() {
  const { emailid } = useParams();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3002/allproducts/${emailid}`);
      const data = await response.json();

      if (response.ok) {
        console.log(data);

        setProducts(data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to fetch products');
    }
  };

  function handleEdit(productName) {
    navigate(`/editproduct/${productName}`);
  }

  function handleSportsClick(Category) {
    navigate(`/${emailid}/${Category}`);
  }

  function handleElectronicsClick(Category) {
    navigate(`/${emailid}/${Category}`);
  }

  function handleSorting() {
    navigate(`/sortedproducts/${emailid}`);
  }

  const handleDelete = async (productName) => {
    try {
      const response = await fetch('http://localhost:3002/deleteproduct', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName }),
      });

      if (response.ok) {
        console.log(`Product "${productName}" deleted successfully`);
        fetchProducts(); // Refresh the product list
      } else {
        setError('Failed to delete product');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to delete product');
    }
  };

  return (
    <>
      <div className='DashBoard'>
        <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
          <div className="container">
            <Link to="/" className="navbar-brand">
              MyCart
            </Link>

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to={`/addproduct/${emailid}`} className="nav-link">
                    Add Product
                  </Link>
                </li>
                <li className="nav-item">
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="category-dropdown">
                      Category
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleSportsClick('Sports')}>Sports</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleElectronicsClick('Electronics')}>Electronics</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="nav-item">
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="sort-dropdown" onClick={handleSorting}>
                      Sort By Price
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/sortprice">Price</Dropdown.Item>
                     
                    </Dropdown.Menu>
                  </Dropdown>
                </li>

                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="product-list-container">
          {error && <div className="error">{error}</div>}
          <div className="card-container">
            {products.map((product) => (
              <Card key={product.identity.low} className="custom-card">
                <Card.Body>
                  <Card.Title>{product.properties.productName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Category:{product.properties.category}</Card.Subtitle>
                  <Card.Text>
                   Description:{product.properties.description}
                    <br />
                    Price: {product.properties.price}
                  </Card.Text>
                  <Card.Link onClick={() => handleEdit(product.properties.productName)}>Edit</Card.Link>
                  <Card.Link onClick={() => handleDelete(product.properties.productName)}>Delete</Card.Link>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
