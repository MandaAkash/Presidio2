const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const loginRoute=require('./routes/loginRoute')
const app = express();
app.use(cors())
app.use(express.json());
// Connect to MongoDB
mongoose.connect('mongodb+srv://mandaakash6:mandaakash6@cluster0.0uosz.mongodb.net/presidio?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{console.log("connected")}).catch(()=>{console.log("not connected")});
// Routes
app.use('/users', userRoutes);
app.use('/properties', propertyRoutes);
app.use('/login',loginRoute)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
