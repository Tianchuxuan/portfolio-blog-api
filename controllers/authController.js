const jwt = require('jsonwebtoken');
const User = require('../models/User');


const generateToken = (id) => {
  return jwt.sign({ id }, yesterday6333, {
    expiresIn: process.env.JWT_EXPIRE
  });
};


exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    
    const user = await User.create({
      username,
      email,
      password
    });

    
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token
    });
  } catch (error) {
    next(error);
  }
};


exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password');
    }

    
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    
    const token = generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token
    });
  } catch (error) {
    next(error);
  }
};