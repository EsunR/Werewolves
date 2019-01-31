const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const fs = require('fs')
const https = require('https')

// 根据项目的路径导入生成的证书文件
const privateKey = fs.readFileSync(path.join(__dirname, './certificate/private.key'), 'utf8')
const certificate = fs.readFileSync(path.join(__dirname, './certificate/certificate.crt'), 'utf8')
const credentials = {
  key: privateKey,
  cert: certificate,
}


var server = express();

// 创建https服务器实例
const httpsServer = https.createServer(credentials, server)
// 设置https的访问端口号
const SSLPORT = 8080

// 启动服务器，监听对应的端口
httpsServer.listen(SSLPORT, () => {
  console.log(`HTTPS Server is running on: https://localhost:${SSLPORT}`)
})

//获取请求数据
server.use(bodyParser.urlencoded());
server.use(bodyParser.json({limit: '1mb'}));
server.use(bodyParser.urlencoded({
  extended: true
}));


// router
server.use('/api/werewolves', require('./route/werewolves.js')());

