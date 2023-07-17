import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import './Category.css';

const Category = () => {
   const param=useParams();
    const category=param.Category;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
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

  return (
    <div className="filtered-products">
      <h1>Filtered Products</h1>
      {error && <div className="error">{error}</div>}
      {products.map((product) => (
        <div key={product.identity.low} className="product-card">
          <h3>{product.properties.productName}</h3>
          <p>Category: {product.properties.category}</p>
          <p>Description: {product.properties.description}</p>
          <p>Price: {product.properties.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Category;
