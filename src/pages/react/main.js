// service worker
// import * as serviceWorker from '@/serviceWorker';

// 基础模块
import React from 'react';
import ReactDOM from 'react-dom';

// Redux状态库
import { Provider } from 'react-redux';
import store from './store';

// 路由模块
import { HashRouter as Router } from 'react-router-dom';
// import { BrowserRouter as Router } from 'react-router-dom';

// 入口页面
import App from '@-react/App';

// i18n
import I18n from '@/i18n';

// 全局样式
import '@/styles';

const i18n = new I18n();

// serviceWorker.register();
// console.log('routes', routes);
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App i18n={i18n} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// serviceWorker.unregister();
