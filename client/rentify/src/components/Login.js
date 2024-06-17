import React, { useState } from 'react';
import '../login.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [boxHovered, setBoxHovered] = useState(false); // State to track box hover
  const [loading, setLoading] = useState(false); // State to track loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login starts
    try {
      const response = await fetch('https://presidio2.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem('email', email);
        localStorage.setItem('name', data.user.firstName);
        setLoggedIn(true);
      }
      if (response.status === 401) {
        alert('Passwords do not match. Please try again!');
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false); // Set loading to false when login ends
    }
  };

  return (
    <div className={`login-container ${boxHovered ? 'hovered' : ''}`} onClick={() => setBoxHovered(!boxHovered)}>
      <div className="box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          /><br />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div><p>Not yet registered? <Link to="/register">Register now</Link></p></div>
      </div>
    </div>
  );
};

export default Login;
