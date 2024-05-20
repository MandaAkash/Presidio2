// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login route
router.post('/', async (req, res) => {
  const { email,password } = req.body;
  try {
    // Check if user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    // Login successful
    else{
      if(password==user.createpassword){
        res.status(200).json({ message: 'Login successful', user });
      }
      else{
        res.status(401).json({ message: "passwords doesnot match" });
      }
  }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
