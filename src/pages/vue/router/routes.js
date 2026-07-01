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
        name: 'vue-page.antd-ui',
        component: () => import('@-vue/views/ui/antd-ui'),
      },

      {
        path: 'element-ui',
        name: 'vue-page.element-ui',
        component: () => import('@-vue/views/ui/element-ui'),
      },
    ],
  },

  {
    path: '/vue-api',
    name: 'vue-page.vue-api',
    icon: 'api',
    component: Container,
    children: [
      {
        path: '',
        redirect: 'setup',
        hidden: true,
      },

      {
        path: 'setup',
        name: 'vue-page.setup',
        component: () => import('@-vue/views/vue-api/setup'),
      },
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
        redirect: 'floors',
        hidden: true,
      },

      {
        path: 'floors',
        name: 'vue-page.floors',
        component: () => import('@-vue/views/funnies/floors'),
      },

      {
        path: 'hello-world',
        name: 'vue-page.hello-world',
        component: () => import('@-vue/components/HelloWorld.vue'),
      },
    ],
  },



  // {
  //   path: '/a',
  //   name: 'vue-page.a',
  //   icon: 'home',
  //   component: Container,
  //   children: [
  //     {
  //       path: '',
  //       redirect: 'a',
  //       hidden: true,
  //     },

  //     {
  //       path: 'b',
  //       name: 'vue-page.b',
  //       component: Container,
  //       children: [
  //         {
  //           path: '',
  //           redirect: 'c',
  //           hidden: true,
  //         },

  //         {
  //           path: 'c',
  //           name: 'vue-page.c',
  //           component: Container,
  //           children: [
  //             {
  //               path: '',
  //               redirect: 'd',
  //               hidden: true,
  //             },

  //             {
  //               path: 'd',
  //               name: 'vue-page.d',
  //               component: () => import('@-vue/components/HelloWorld.vue'),
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
], NotFound, true);