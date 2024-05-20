// routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const User=require('../models/User')

// Post a new property
router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const newProperty = await Property.create(req.body);
   
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get properties by seller
router.get('/seller/:email', async (req, res) => {
  try {
    const properties = await Property.find({ "email": req.params.email });
    console.log(properties)
    res.status(200).json(properties);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get('/:id/seller', async (req, res) => {
  try {
    const properties = await Property.find({ "_id": req.params.id });
    console.log(properties)
    res.status(200).json(properties);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a property
router.put('/:id', async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a property
router.delete('/:id', async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
