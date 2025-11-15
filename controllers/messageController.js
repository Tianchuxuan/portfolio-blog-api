const Message = require('../models/Message');

exports.createMessage = async (req, res, next) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
     if (error.name === 'ValidationError') {
      res.status(400).json({
        message: error.message,
        errors: error.errors
      });
      return;
    }
    next(error);
  }
};