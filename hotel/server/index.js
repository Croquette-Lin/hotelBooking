// node后端服务器
const http = require('http');
const badyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const userApi = require('./api/userApi');
const hotelApi = require('./api/hotelApi');
const orderApi = require('./api/orderApi');
// res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization");

let app = express();
let server = http.createServer(app);

app.all('*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');  
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Authorization');  
    next();
});

app.use(badyParser.json());
app.use(badyParser.urlencoded({
    extended: false
}));

// 后端api路由
app.use('/api/user', userApi);
app.use('/api/hotel_category', hotelApi);
app.use('/api/order', orderApi);

// 启动监听
server.listen(8888, () => {
    console.log(' success!! port:8888')
})
