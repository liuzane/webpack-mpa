// 基础模块
import React, { lazy } from 'react';

// 第三方模块
import NProgress from 'nprogress';

const Loading = () => (<div>Loading...</div>);

const LazyLoad = loader => lazy(() => new Promise(resolve => (NProgress.start(), setTimeout(resolve, 500))).then(() => (NProgress.done(), loader)));

export default LazyLoad;

export { Loading };