const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const loginRoute=require('./routes/loginRoute')
const User=require('./models/User')
const Properties=require('./models/Property')
const app = express();
app.use(cors())
app.use(express.json());
// Connect to MongoDB
mongoose.connect('mongodb+srv://mandaakash6:mandaakash6@cluster0.0uosz.mongodb.net/presidio?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10, // Maximum number of socket connections in the pool
  minPoolSize: 1,  // Minimum number of socket connections in the pool
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30 seconds
}).then(()=>{console.log("connected")}).catch(()=>{console.log("not connected")});
async function warmUpDatabase() {
  try {
    await User.findOne({}); // Perform a simple query to warm up the database
    console.log('Database warmed up');
  } catch (error) {
    console.error('Error warming up the database: ', error);
  }
}
mongoose.connection.once('open', () => {
  warmUpDatabase();
});
// Routes
app.use('/users', userRoutes);
app.use('/properties', propertyRoutes);
app.use('/login',loginRoute)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
