import React, { useState,useEffect } from 'react';
import './EditPage.css';
import { useParams } from 'react-router-dom';

const EditPage = () => {
    const { productname } = useParams();
  const [productName, setProductName] = useState(productname);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3002/products/${productname}`);

      if (response.ok) {
        const data = await response.json();
        const { description, category, price } = data;
        setDescription(description);
        setCategory(category);
        setPrice(price);
      } else {
        console.error('Failed to fetch product');
      }
    } catch (error) {
      console.error(error);
      console.error('Failed to fetch product');
    }
  };



  const handleUpdate = async () => {
    try {
      const response = await fetch(`/products/${productname}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productName,
          description,
          category,
          price,
        }),
      });

      if (response.ok) {
        console.log(`Product "${productName}" updated successfully`);
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error(error);
      console.error('Failed to update product');
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <p>Product Name: {productName}</p>
      <div>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleUpdate}>Update Product</button>
    </div>
  );
};

export default EditPage;
