import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000;

// 启用 CORS
app.use(cors());

// 中间件来解析 POST 请求体中的数据
app.use(bodyParser.urlencoded({ extended: true }));

// 静态文件服务
app.use(express.static('public'));

// 处理表单提交的路由
app.post('/submit', (req, res) => {
  console.log(req.body); // 打印提交的表单数据
  res.send("表单数据接收成功！");
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
