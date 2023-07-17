import React, { useState } from 'react';
import './addProductForm.css';
import {useParams,Link,useNavigate} from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'


const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const {emailid}=useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3002/addproducts/${emailid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName, description, category, price }),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Product added successfully');
        // Reset form values
        setProductName('');
        setDescription('');
        setCategory('');
        setPrice('');
        setError('');
      } else {
        setError(responseData.error || 'Failed to add product');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to add product');
    }
  };


  
  function handleSportsClick(Category) {
    navigate(`/${emailid}/${Category}`);
  }

  function handleElectronicsClick(Category) {
    navigate(`/${emailid}/${Category}`);
  }

  function handleSorting() {
    navigate(`/sortedproducts/${emailid}`);
  }


  return (

     <div className="addproduct-class">

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








    <div className="add-product-form">
      <h2>Add Product</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>




    </div>
  );
};

export default AddProductForm;
