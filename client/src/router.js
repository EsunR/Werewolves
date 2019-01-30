import VueRouter from 'vue-router';

//导入对应的组件 
import Home from './components/menu/HomeMenu.vue'
import RoomInfo from './components/found/RoomInfo.vue'

var router = new VueRouter({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: Home},
    {path: '/found/RoomInfo', component: RoomInfo}
  ]
})

// 把路由对象暴露出去
export default router;