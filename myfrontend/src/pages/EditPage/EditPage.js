import React, { useState,useEffect } from 'react';
import './EditPage.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditPage = () => {
    const { productName } = useParams();
    const navigate = useNavigate();
  const [productname, setProductname] = useState(productName);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
 


  const handleUpdate = async (e) => {
    e.preventDefault();
    setDescription('');
    setCategory('');
    setPrice('');

    try {
      const response = await fetch(`http://localhost:3002/updateproduct/${productName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, category, price }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Product information updated');
        // navigate(`/Dashboard/${email}`);
  
        // Perform any necessary actions after the update
      } else {
        setError('Failed to update product information');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to update product information');
    }
    
    // navigate(`/Dashboard/${emailid}`)

  };

  return (
    <div className='edit-form'>
      <h2>Edit Product</h2>
      <p>Product Name: {productName}</p>
      {error && <div>{error}</div>}
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
