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
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData(prevFormData => ({
        ...prevFormData,
        seller: user._id,  // Update to user ID
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
  
    const requiredFields = ['place', 'area', 'bedrooms', 'bathrooms', 'nearbyHospitals', 'nearbyColleges'];
    const isEmptyField = requiredFields.some(field => !formData[field]);
  
    if (isEmptyField) {
      alert('Please fill in all required fields');
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
      const response = await fetch('http://localhost:5000/properties', {
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
        /><br/>
        <input
          type="number"
          name="area"
          placeholder="Area"
          value={formData.area}
          onChange={handleChange}
          className="post-property-input"
          required
        /><br/>
        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          className="post-property-input"
          required
        /><br/>
        <input
          type="number"
          name="bathrooms"
          placeholder="Bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          className="post-property-input"
          required
        /><br/>
        <input
          type="text"
          name="nearbyHospitals"
          placeholder="Nearby Hospitals (comma-separated)"
          value={formData.nearbyHospitals}
          onChange={handleChange}
          className="post-property-input"
          required
        /><br/>
        <input
          type="text"
          name="nearbyColleges"
          placeholder="Nearby Colleges (comma-separated)"
          value={formData.nearbyColleges}
          onChange={handleChange}
          className="post-property-input"
          required
        /><br/>
        <button
          type="button"
          onClick={handleClick}
          className="post-property-button"
        >
          Post Property
        </button>
      </form>
      <button
        type="button"
        onClick={() => navigate('/manage')}
        className="manage-properties-button"
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
