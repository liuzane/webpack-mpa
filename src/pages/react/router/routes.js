// 工具方法
import { createRoutes } from './tools';

// 异步加载
import AsyncLoad from './AsyncLoad';

// 容器组件
import Container from './Container';

// 404 未找到页面
const NotFound = {
  path: '',
  hidden: true,
  component: AsyncLoad(() => import('@-react/components/NotFound')),
};

const routes = [
  {
    path: '',
    redirect: 'home',
    exact: true,
    hidden: true,
  },

  {
    path: 'home',
    title: 'react-page.home',
    icon: 'icon-home',
    component: AsyncLoad(() => import('@-react/views/home')),
    exact: true,
  },

  {
    path: 'components',
    title: 'react-page.components',
    icon: 'icon-components',
    component: Container,
    children: [
      {
        path: '',
        exact: true,
        redirect: 'filter',
        hidden: true,
      },

      // {
      //   path: 'count-table',
      //   title: 'react-page.components.count-table',
      //   component: AsyncLoad(() => import('@-react/views/components/count-table')),
      //   exact: true,
      // },

      {
        path: 'filter',
        title: 'react-page.components.filter',
        component: AsyncLoad(() => import('@-react/views/components/filter')),
        exact: true,
      },

      {
        path: 'rc-table',
        title: 'react-page.components.rc-table',
        component: AsyncLoad(() => import('@-react/views/components/rc-table')),
        exact: true,
      },

      {
        path: 'validate',
        title: 'react-page.components.validate',
        component: AsyncLoad(() => import('@-react/views/components/validate')),
        exact: true,
      },
    ],
  },

  {
    path: 'funnies',
    title: 'react-page.funnies',
    icon: 'icon-funnies',
    component: Container,
    children: [
      {
        path: '',
        exact: true,
        redirect: 'animation',
        hidden: true,
      },

      {
        path: 'animation',
        title: 'react-page.funnies.animation',
        component: AsyncLoad(() => import('@-react/views/funnies/animation')),
        exact: true,
      },

      {
        path: 'floors',
        title: 'react-page.funnies.floors',
        component: AsyncLoad(() => import('@-react/views/funnies/floors')),
        exact: true,
      },

      {
        path: 'svg',
        title: 'react-page.funnies.svg',
        component: AsyncLoad(() => import('@-react/views/funnies/svg')),
        exact: true,
      },

      {
        path: 'iframe',
        title: 'react-page.funnies.iframe',
        component: AsyncLoad(() => import('@-react/views/funnies/iframe')),
        exact: true,
      },
    ],
  },

  {
    path: 'syntax',
    title: 'react-page.syntax',
    icon: 'icon-syntax',
    component: Container,
    children: [
      {
        path: '',
        exact: true,
        redirect: 'typescript',
        hidden: true,
      },

      {
        path: 'typescript',
        title: 'react-page.syntax.typescript',
        component: AsyncLoad(() => import('@-react/views/syntax/typescript')),
        exact: true,
      },

      {
        path: 'react-hooks',
        title: 'react-page.syntax.react-hooks',
        component: AsyncLoad(() => import('@-react/views/syntax/react-hooks')),
        exact: true,
      },
    ],
  },

  {
    path: 'interview-questions',
    title: 'react-page.interview-questions',
    icon: 'icon-syntax',
    component: Container,
    children: [
      {
        path: '',
        exact: true,
        redirect: 'event-loop',
        hidden: true,
      },

      {
        path: 'event-loop',
        title: 'react-page.interview-questions.event-loop',
        component: AsyncLoad(() => import('@-react/views/interview-questions/event-loop')),
        exact: true,
      },
    ],
  },

  {
    path: 'others',
    title: 'react-page.others',
    icon: 'icon-others',
    component: Container,
    children: [
      {
        path: '',
        exact: true,
        redirect: 'less',
        hidden: true,
      },

      {
        path: 'less',
        title: 'react-page.others.less',
        component: AsyncLoad(() => import('@-react/views/others/Less')),
        exact: true,
      },

      {
        path: 'module',
        title: 'react-page.others.module',
        component: AsyncLoad(() => import('@-react/views/others/Module')),
        exact: true,
      },

      {
        path: 'grammar',
        title: 'react-page.others.grammar',
        component: AsyncLoad(() => import('@-react/views/others/Grammar')),
        exact: true,
      },
    ],
  },
];


export default createRoutes(routes, NotFound, true);