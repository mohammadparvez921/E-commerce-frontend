import React, { useState } from 'react';
import './addProductForm.css';
import {useParams} from 'react-router-dom'
const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const {emailid}=useParams();

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

  return (
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
  );
};

export default AddProductForm;
