import React,{useState,useEffect} from 'react'
import {useNavigate, useParams}  from 'react-router-dom'
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';


function DashBoard() {
  const {emailid}= useParams();
  
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
  
  function handleEdit(productName){
    navigate(`/editproduct/${productName}`);
    
  }
  
  function handleSportsClick(Category){
    navigate(`/${emailid}/${Category}`);
  };
  
 
  function handleElectronicsClick(Category){
    // setCategoery(Category);
    navigate(`/${emailid}/${Category}`);
  }

  function  handleSorting(){
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
    <div className='DashBoard'>
      {/* navbar */}
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
                  <Dropdown.Item  onClick={()=>handleSportsClick('Sports')}>Sports</Dropdown.Item>
                  <Dropdown.Item   onClick={()=>handleElectronicsClick('Electronics')}>Electronics</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item">
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="sort-dropdown"  onClick={handleSorting}>
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
        


        {/* product list */}

        <div className="product-list-container">
      <h2>Product List</h2>
      {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.identity.low}>
                
              <td>{product.properties.productName}</td>
              <td>{product.properties.category}</td>
              <td >{product.properties.description}</td>
              <td >{product.properties.price}</td>
              <td >
              
                 <button   onClick={()=>handleEdit(product.properties.productName)} >Edit</button>
                
                  
              </td>
              <td>
                <button onClick={() => handleDelete(product.properties.productName)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>        
    </div>
  )
}

export default DashBoard