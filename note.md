- [属性报错](#%E5%B1%9E%E6%80%A7%E6%8A%A5%E9%94%99)
- [为JSON添加元素](#%E4%B8%BAjson%E6%B7%BB%E5%8A%A0%E5%85%83%E7%B4%A0)
- [设计POST接口](#%E8%AE%BE%E8%AE%A1post%E6%8E%A5%E5%8F%A3)
  - [1.以VueResource为工具发出POST请求](#1%E4%BB%A5vueresource%E4%B8%BA%E5%B7%A5%E5%85%B7%E5%8F%91%E5%87%BApost%E8%AF%B7%E6%B1%82)
  - [2.Node服务器端接收POST请求](#2node%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E6%8E%A5%E6%94%B6post%E8%AF%B7%E6%B1%82)
- [为Node服务器添加HTTPS支持](#%E4%B8%BAnode%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%B7%BB%E5%8A%A0https%E6%94%AF%E6%8C%81)
- [解决跨域访问get和post接口的CORS问题](#%E8%A7%A3%E5%86%B3%E8%B7%A8%E5%9F%9F%E8%AE%BF%E9%97%AEget%E5%92%8Cpost%E6%8E%A5%E5%8F%A3%E7%9A%84cors%E9%97%AE%E9%A2%98)
## 属性报错
```html
<mt-picker :slots="slots" @change="onValuesChange" visibleItemCount="3"></mt-picker>
```
提示：`visibleItemCount` 不是一个有效属性

解决办法：为 `visibleItemCount` 添加一个 `:` 或者 `@` 修饰符
```html
<mt-picker :slots="slots" @change="onValuesChange" :visibleItemCount="3"></mt-picker>
```

## 为JSON添加元素
```js
var json = {};
// 方法1：直接添加属性
json.poro = "233";
// 方法2：key为变量
let key = "poro";
json[key] = "233";
```

## 设计POST接口
由于作为API接口使用而接受的POST请求，通常为 `Request Payload` 形式的，其传递的的类型为 `application/json,`

> 这里注意区分以表单形式提交的数据为 `Form Data` 形式的，其传递类型为 `application/x-www-form-urlencoded`

### 1.以VueResource为工具发出POST请求
```js
postRoomInfo() {
  this.$http
    .post("postRoomInfo", { player_num: this.player_num, rule: this.rule })
    .then(res => {
      console.log(res.body);
    });
}
```

### 2.Node服务器端接收POST请求
```js
// 在server.js引入body-parser，使用body-parser来处理post数据
const express = require('express');
const bodyParser = require('body-parser');

var server = express();
server.listen(8080);

// 用来支持表单类数据的接受
server.use(bodyParser.urlencoded());
// 用于支持 Request Payload 数据的接收
server.use(bodyParser.json({limit: '1mb'}));
server.use(bodyParser.urlencoded({
  extended: true
}));
```

```js
// 路由端接受POST请求，并在控制台输出接收到的信息，并返回 “OK”
router.post('/postRoomInfo', (req, res) => {
  console.log(req.body);
  res.send('ok');
})
```

还有一种原生支持的方法，无需 `body-parser`
> 这里要注意的是，`Request Payload` 是数据流类型的，所以需要监听 `data` 事件来获取数据。
```js
router.post('/postRoomInfo', (req, res) => {
  console.log(req.body);
  var str = "";
  req.on("data", function (chunk) {
    str += chunk
  })
  req.on("end", function () {
    console.log(str);
    res.send('ok');
  })
}
```

## 为Node服务器添加HTTPS支持
主要为了解决 `https` 中请求 `http` 导致无法请求的问题。  
`https` 模块是node的原生模块。
```js
const express = require('express');
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

// 创建Express实例
var server = express();

// 设置https的访问端口号
const SSLPORT = 8080

// 启动服务器，监听对应的端口
httpsServer.listen(SSLPORT, () => {
  console.log(`HTTPS Server is running on: https://localhost:${SSLPORT}`)
})
```

## 解决跨域访问get和post接口的CORS问题
为服务器请求设置合法Header就可以解决。
```js
const express = require('express');
// 创建Express实例
// 如果要在路由中使用，则创建为：var server = express.Router();
var server = express();
server.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});
```