const BlogPost = require('../models/BlogPost');


exports.getBlogPosts = async (req, res, next) => {
  try {
    const blogPosts = await BlogPost.find()
      .populate('author', 'username')
      .sort('-createdAt');
    res.status(200).json(blogPosts);
  } catch (error) {
    next(error);
  }
};


exports.getBlogPost = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id)
      .populate('author', 'username')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username' }
      });

    if (!blogPost) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    res.status(200).json(blogPost);
  } catch (error) {
    next(error);
  }
};


exports.createBlogPost = async (req, res, next) => {
  try {
    
    req.body.author = req.user._id;

    const blogPost = await BlogPost.create(req.body);
    res.status(201).json(blogPost);
  } catch (error) {
    next(error);
  }
};


exports.updateBlogPost = async (req, res, next) => {
  try {
    let blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    
    if (blogPost.author.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this blog post');
    }

    blogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json(blogPost);
  } catch (error) {
    next(error);
  }
};


exports.deleteBlogPost = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    
    if (blogPost.author.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this blog post');
    }

    await blogPost.deleteOne();
    res.status(200).json({ message: 'Blog post deleted' });
  } catch (error) {
    next(error);
  }
};