// 路由处理工具
import { Container, createRoutes } from './tools';

// 404 未找到页面
const NotFound = {
  path: '/:pathMatch(.*)*',
  hidden: true,
  component: () => import('@-vue/views/not-found'),
};

export default createRoutes([
  {
    path: '',
    redirect: '/home',
    hidden: true,
  },

  {
    path: '/home',
    name: 'vue-page.home',
    icon: 'home',
    component: () => import('@-vue/views/home'),
  },

  {
    path: '/library',
    name: 'vue-page.library',
    icon: 'library',
    component: Container,
    children: [
      {
        path: '',
        redirect: 'antd-ui',
        hidden: true,
      },

      {
        path: 'antd-ui',
        name: 'vue-page.library.antd-ui',
        component: () => import('@-vue/views/library/antd-ui'),
      },

      {
        path: 'lodash',
        name: 'vue-page.library.lodash',
        component: () => import('@-vue/views/library/lodash'),
      }
    ],
  },

  {
    path: '/funnies',
    name: 'vue-page.funnies',
    icon: 'funnies',
    component: Container,
    children: [
      {
        path: '',
        redirect: 'fireworks',
        hidden: true,
      },

      {
        path: 'fireworks',
        name: 'vue-page.funnies.fireworks',
        component: () => import('@-vue/views/funnies/fireworks'),
      },

      {
        path: 'spin-wheel',
        name: 'vue-page.funnies.spin-wheel',
        component: () => import('@-vue/views/funnies/spin-wheel'),
      },
    ],
  },
], NotFound, true);