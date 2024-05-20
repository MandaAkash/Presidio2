// models/Property.js
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  email:String,
  seller: String,
  place: String,
  area: Number,
  bedrooms: Number,
  bathrooms: Number,
  nearbyHospitals: [String],
  nearbyColleges: [String],
});

module.exports = mongoose.model('Property', propertySchema);
