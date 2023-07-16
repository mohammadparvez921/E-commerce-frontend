import React, { useState, useEffect } from 'react';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3002/allproducts');
      const data = await response.json();

      if (response.ok) {
        setProducts(data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to fetch products');
    }
  };

  const handleEdit = (productId) => {
    console.log(`Edit product with ID ${productId}`);
  };

  const handleDelete = (productId) => {
    console.log(`Delete product with ID ${productId}`);
  };

  return (
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
            <tr key={product.id}>
              <td>{product.productName}</td>
              <td>{product.description}</td>
              <td >{product.category}</td>
              <td >{product.price}</td>
              <td >
                <button onClick={() => handleEdit(product.id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;