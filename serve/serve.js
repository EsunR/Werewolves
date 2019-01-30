const express = require('express');
const bodyParser = require('body-parser');
const expressRoute = require('express-route');


var server = express();
server.listen(8080);

//1.获取请求数据
//get自带
//post数据调用中间件body-parser
server.use(bodyParser.urlencoded());
server.use(bodyParser.json({limit: '1mb'}));
server.use(bodyParser.urlencoded({
  extended: true
}));


//4.router
server.use('/api/werewolves', require('./route/werewolves.js')());

