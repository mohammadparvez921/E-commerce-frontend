import React, { useEffect, useState } from 'react';
import './SortedProducts.css';
import { useParams } from 'react-router-dom';



const SortedProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const params=useParams();
  console.log(params);
  const email=params.emailid;
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3002/sortingproducts/${email}`);
        const data = await response.json();

        if (response.ok) {
          // Sort products by price in ascending order
          data.sort((a, b) => a.properties.price - b.properties.price);
          setProducts(data);
        } else {
          setError('Failed to fetch products');
        }
      } catch (error) {
        console.error(error);
        setError('Failed to fetch products');
      }
    };

    fetchProducts();
  }, [email]);

  return (
    <div>
      <h1>Product List</h1>
      {error && <div>{error}</div>}
      {products.map((product) => (
        <div key={product.identity.low}>
          <h3>{product.properties.productName}</h3>
          <p>Category: {product.properties.category}</p>
          <p>Price: {product.properties.price}</p>
        </div>
      ))}
    </div>
  );
};

export default SortedProducts;
