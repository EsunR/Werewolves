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