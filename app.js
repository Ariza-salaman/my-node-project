import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
const upload = multer(); // 配置multer，这里使用默认设置

const app = express();
const PORT = 3000;

// 启用 CORS
app.use(cors());

// 中间件来解析 POST 请求体中的数据
app.use(bodyParser.urlencoded({ extended: true }));

// 静态文件服务
app.use(express.static('public'));

// 处理表单提交的路由
app.post('/submit', upload.any(), (req, res) => {
  const userData = {
    user_name: req.body.user_name,
    user_email: req.body.user_email,
    user_message: req.body.user_message
  };

  // 打印为格式化的JSON字符串，其中缩进设置为2个空格
  console.log(JSON.stringify(userData, null, 2));
  res.send(`hello ${req.body.user_name}, thanks for your submission!`);
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
