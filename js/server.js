// server.js
const express = require('express');
const cors = require('cors');
const https = require('https');
const app = express();

app.use(cors());

// Маршрут для получения курса валют
app.get('/api/currency', (req, res) => {
    https.get('https://currate.ru/api/?get=rates&pairs=USDRUB&key=c5d61203133a4389db931c72a6d10bcf', (apiRes) => {
        let data = '';

        apiRes.on('data', chunk => {
            data += chunk;
        });

        apiRes.on('end', () => {
            res.send(JSON.parse(data));
        });
    });
});

// Запуск сервера на порту 80
app.listen(80, function () {
    console.log('Server is running on port 80');
});
