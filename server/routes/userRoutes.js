const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register a new user
router.post('/', async (req, res) => {
  
  try {
    const email=req.body.email;
    const phoneNumber=req.body.phoneNumber;
    const user = await User.findOne({ email:email});
    const userphone=await User.findOne({phoneNumber:phoneNumber})
    if(user===null&&userphone===null) 
    {
        const newUser = await User.create(req.body);  
        res.status(201).json(newUser);
    }
    else{
      res.status(202).json({message:"User email or phone number already exists"})
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    console.log(users)
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Other user routes (login, update, delete, etc.) can be added similarly

module.exports = router;
