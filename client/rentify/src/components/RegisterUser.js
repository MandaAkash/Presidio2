import React, { useState } from 'react';
import '../RegisterUser.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    createpassword: '',
  });

  const [loading, setLoading] = useState(false); // State to track loading

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when registration starts
    try {
      const response = await fetch('https://presidio2.onrender.com/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (response.status === 201) {
        alert("User registered successfully");
      }
      if (response.status === 202) {
        alert("User email or phone number already exists!!");
      }
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        createpassword: '',
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false when registration ends
    }
  };

  const [boxHovered, setBoxHovered] = useState(false); // State to track box hover

  return (
    <div className={`register-container ${boxHovered ? 'hovered' : ''}`} onClick={() => setBoxHovered(!boxHovered)}>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="box">
          <h2>Register</h2>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            disabled={loading} // Disable input while loading
          /><br />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            disabled={loading} // Disable input while loading
          /><br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="new-password"
            required
            disabled={loading} // Disable input while loading
          /><br />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            disabled={loading} // Disable input while loading
          /><br />
          <input
            type="password"
            name="createpassword"
            placeholder="Create Password"
            autoComplete="off"
            value={formData.createpassword}
            onChange={handleChange}
            required
            disabled={loading} // Disable input while loading
          /><br />
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          <p>Already registered? <Link to='/'>Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
