import VueRouter from 'vue-router';

//导入对应的组件 
import Home from './components/menu/HomeMenu.vue'
import RoomInfo from './components/found/RoomInfo.vue'
import Ready from './components/found/Ready.vue'
import Playing from './components/join/Playing.vue'

var router = new VueRouter({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: Home},
    {path: '/found/RoomInfo', component: RoomInfo},
    {path: '/found/Ready', component: Ready},
    {path: '/join/Playing', component: Playing}
  ]
})

// 把路由对象暴露出去
export default router;