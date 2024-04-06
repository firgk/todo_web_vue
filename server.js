const express = require('express');
const fs = require('fs');
const app = express();
const port = 9999;

// 声明一个全局变量来保存 JSON 数据

// 定义一个GET请求的路由，返回 JSON 数据
app.get('/api/getter', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'Failed to read data from file' });
            return;
        }
        jsonData = JSON.parse(data);
        console.log(jsonData);
        res.json(jsonData);
    });
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/api/saver', (req, res) => {
    console.log(req.body)
    const data = JSON.stringify(req.body); // 将请求主体转换为 JSON 字符串
    fs.writeFile('data.json', data, { flag: 'w' }, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to save JSON data' });
        }
        return res.json({ message: 'JSON data has been saved' });
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
