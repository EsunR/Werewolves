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