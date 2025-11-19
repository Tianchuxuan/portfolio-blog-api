require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

// 导入路由模块
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

// 安全头部中间件（增强 API 安全性）
app.use(helmet());

// 【核心修复】显式配置 CORS，仅允许前端 Vercel 域名访问
app.use(cors({
  origin: "https://react-339u5r7li-tianchuxuans-projects.vercel.app", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true, // 允许携带凭证（如 Token、Cookie）
  allowedHeaders: ["Content-Type", "Authorization"] // 允许的请求头
}));

// 解析 JSON 和 URL 编码的请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 根路由（健康检查）
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Portfolio & Blog API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// 注册业务路由
app.use('/api/users', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/blog/:blogId/comments', commentRoutes);
app.use('/api/contact', messageRoutes);

// 404 路由处理
app.use((req, res) => {
  res.status(404).json({
    message: `Not Found - ${req.method} ${req.originalUrl}`
  });
});

// 全局错误处理中间件
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) // 开发环境返回错误栈
  });
});

// MongoDB 数据库连接
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // 数据库连接失败时退出进程
  });


const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});