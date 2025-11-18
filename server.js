require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet'); 
const cors = require('cors'); 


const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');
const messageRoutes = require('./routes/messageRoutes');


const app = express();


app.use(helmet()); 
app.use(
  cors({
    origin: 'https://react-eq9vx8qp-tianchuxuans-projects.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Portfolio & Blog API is running',
    environment: process.env.NODE_ENV || 'development', 
    timestamp: new Date().toISOString()
  });
});


app.use('/api/users', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/blog/:blogId/comments', commentRoutes);
app.use('/api/contact', messageRoutes);


app.use((req, res) => {
  res.status(404).json({ 
    message: `Not Found - ${req.method} ${req.originalUrl}` 
  });
});


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Server Error',
    
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); 
  });


const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});