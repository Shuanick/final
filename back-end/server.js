const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const uploadRoutes = require('./routes/upload');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const app = express();
const port = process.env.PORT;
MONGODB_URI = "mongodb+srv://linshuan880727:linshuan0727@nickserver.0wgra.mongodb.net/?retryWrites=true&w=majority&appName=NickServer";

// 连接到 MongoDB
// mongoose.connect('mongodb+srv://linshuan880727:linshuan0727@nickserver.0wgra.mongodb.net/?retryWrites=true&w=majority&appName=NickServer');
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// 检查连接
mongoose.connection.on('connected', () => {
  console.log(MONGODB_URI);
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

app.use(cors({
    origin: 'https://nickproduct-34117fcf6cd3.herokuapp.com', // 允许此来源的请求
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的 HTTP 方法
    allowedHeaders: ['Content-Type', 'Authorization'] // 允许的标头
}));

// 中间件
app.use(express.json());
app.use(express.static(path.join(__dirname, 'front-end/dist')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end/dist', 'index.html'));
  });
// 设置路由
app.use('/upload', uploadRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
