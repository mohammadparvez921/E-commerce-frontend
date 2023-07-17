import React, { useState, useEffect } from 'react';
import {useParams,Link,useNavigate} from 'react-router-dom';
import './Category.css';
import Card from 'react-bootstrap/Card';
import { Dropdown } from 'react-bootstrap'

const Category = () => {
   const param=useParams();
    const category=param.Category;
    const email=param.emailid;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts= async () => {
      try {
        const response = await fetch(`http://localhost:3002/searchproducts/${category}`);
        const data = await response.json();
        

        if (response.ok) {
          setProducts(data);
          console.log("successfully fetched");
          console.log(data);
        } else {
          setError('Failed to fetch products');
        }
      } catch (error) {
        console.error(error);
        setError('Failed to fetch products');
      }
    };

    fetchProducts();
  },[category]);




  function handleSportsClick(Category) {
    navigate(`/${email}/${Category}`);
  }

  function handleElectronicsClick(Category) {
    navigate(`/${email}/${Category}`);
  }

  function handleSorting() {
    navigate(`/sortedproducts/${email}`);
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

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3002/allproducts/${email}`);
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


  return (
      <div className="category">
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
          <div className="container">
            <Link to="/" className="navbar-brand">
              MyCart
            </Link>

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to={`/addproduct/${email}`} className="nav-link">
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
                      {/* <Dropdown.Item as={Link} to="/sortprice">Price</Dropdown.Item> */}
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
                  <Card.Subtitle className="mb-2 text-muted">Category :{product.properties.category}</Card.Subtitle>
                  <Card.Text>
                    Description :{product.properties.description}
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




   
  );
};

export default Category;
