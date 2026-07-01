// service worker
import * as serviceWorker from '@/serviceWorker';

// 基础模块
import React from 'react';
import ReactDOM from 'react-dom';

// 多语言模块
import LangProvider from './languages';

// 全局样式
import '@/styles';

// 入口组件
import Login from './Login';


ReactDOM.render(
  <LangProvider>
    <Login />
  </LangProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();