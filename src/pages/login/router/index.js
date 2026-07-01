// 方法
import { deepCopy } from '@/utils/assist';

// 处理路由配置
const handleRoutes = (routes, parentPath) => {
  const cloneRoutes = deepCopy(routes);

  return cloneRoutes.reduce((prevRoutes, currentRoute) => {
    if (parentPath && currentRoute.path.substr(0, 1) !== '/') {
      currentRoute.path = parentPath + (currentRoute.path === '' ? '' : '/' + currentRoute.path);

      if (currentRoute.redirect) {
        currentRoute.redirect = currentRoute.redirect.substr(0, 1) === '/' ? currentRoute.redirect : (parentPath + '/' + currentRoute.redirect);
      }
    }

    if (currentRoute.children) {
      const children = handleRoutes(currentRoute.children, currentRoute.path);

      if (currentRoute.component) {
        currentRoute.children = children;
        return prevRoutes.concat([ currentRoute ]);
      } else {
        return prevRoutes.concat(children);
      }
    } else {
      return prevRoutes.concat(currentRoute);
    }
  }, []);
};


export default handleRoutes;

// 路由视图
export { default as RouterView } from './RouterView';

// 异步路由
export { default as AsyncLoad } from './AsyncLoad';

// 页面之间跳转方法
export { default as goto } from './goto';

// 获取 url 路径转换为参数
export { default as getCurrentUrlPath } from './getCurrentUrlPath';