// index.js
import express, { json } from 'express';
import { join } from 'path'; // 为了路径安全性，使用 path.join
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import JSObject1 from './utils/functionModules.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// 提供静态文件
app.use(express.static(join(__dirname, '..', 'public')));

// 如果你想要确保任何路由都返回 index.html，
// 则可以使用以下路由代替上面的app.get
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

const extraFields = JSObject1.extraFields

const data = JSObject1.modelList

console.log(JSObject1.generateValues(data, extraFields));


