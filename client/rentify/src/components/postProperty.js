import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PostProperty.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const PostProperty = ({ user }) => {
  const [formData, setFormData] = useState({
    email: '',
    seller: '',  
    place: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    nearbyHospitals: '',
    nearbyColleges: '',
  });
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when posting starts
  
    const requiredFields = ['place', 'area', 'bedrooms', 'bathrooms', 'nearbyHospitals', 'nearbyColleges'];
    const isEmptyField = requiredFields.some(field => !formData[field]);
  
    if (isEmptyField) {
      alert('Please fill in all required fields');
      setLoading(false); // Set loading to false if validation fails
      return;
    }
  
    const submitData = {
      ...formData,
      email: localStorage.getItem('email'),
      seller: localStorage.getItem('name'),
      area: Number(formData.area),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      nearbyHospitals: formData.nearbyHospitals.split(',').map(hospital => hospital.trim()),
      nearbyColleges: formData.nearbyColleges.split(',').map(college => college.trim()),
    };
  
    console.log(JSON.stringify(submitData));
    try {
      const response = await fetch('https://presidio2.onrender.com/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      alert("Your details have been posted successfully")
      console.log('Response Data:', data);
      setFormData({
        email: '',
        seller: user ? user._id : '',  
        place: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        nearbyHospitals: '',
        nearbyColleges: '',
      });
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false); // Set loading to false when posting ends
    }
  };
  
  return (
    <div className="post-property-container">
      <form className="post-property-form">
        <h2>Post your properties</h2>
        <input
          type="text"
          name="place"
          placeholder="Place"
          value={formData.place}
          onChange={handleChange}
          className="post-property-input"
          required
          disabled={loading} // Disable input while loading
        /><br/>
        <input
          type="number"
          name="area"
          placeholder="Area"
          value={formData.area}
          onChange={handleChange}
          className="post-property-input"
          required
          disabled={loading} // Disable input while loading
        /><br/>
        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          className="post-property-input"
          required
          disabled={loading} // Disable input while loading
        /><br/>
        <input
          type="number"
          name="bathrooms"
          placeholder="Bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          className="post-property-input"
          required
          disabled={loading} // Disable input while loading
        /><br/>
        <input
          type="text"
          name="nearbyHospitals"
          placeholder="Nearby Hospitals (comma-separated)"
          value={formData.nearbyHospitals}
          onChange={handleChange}
          className="post-property-input"
          required
          disabled={loading} // Disable input while loading
        /><br/>
        <input
          type="text"
          name="nearbyColleges"
          placeholder="Nearby Colleges (comma-separated)"
          value={formData.nearbyColleges}
          onChange={handleChange}
          className="post-property-input"
          required
          disabled={loading} // Disable input while loading
        /><br/>
        <button
          type="button"
          onClick={handleClick}
          className="post-property-button"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Posting...' : 'Post Property'}
        </button>
      </form>
      <button
        type="button"
        onClick={() => navigate('/manage')}
        className="manage-properties-button"
        disabled={loading} // Disable button while loading
      >
        See all your properties
      </button>
      <div className="buyer-link" style={{"position":"relative","bottom":"20px"}}>
        <p>Are you a buyer? <Link to='/buyer'>Click here</Link> to see all properties</p>
      </div>
    </div>
  );
};

export default PostProperty;
