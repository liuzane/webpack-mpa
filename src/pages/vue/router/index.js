// 路由模块
import { createRouter, createWebHashHistory } from 'vue-router';

// 路由配置
import routes from './routes';


export default createRouter({
  history: createWebHashHistory(),
  routes,
});