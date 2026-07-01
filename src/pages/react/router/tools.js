// 地址
import address from '@/address';

// 第三方模块
import { cloneDeep } from 'lodash';

// 处理路由配置
export const createRoutes = (routes, NotFound, isEndConcat) => {
  const recursionRoutes = (routes, parentPath) => {
    return routes.reduce((prevRoutes, currentRoute) => {
      if (!currentRoute.code) {
        currentRoute.code = (currentRoute.redirect || currentRoute.path).replace(/\//g, '');
      }

      if (currentRoute.path.substr(0, 1) !== '/') {
        currentRoute.path = (parentPath || '') + (currentRoute.path === '' ? '/' : '/' + currentRoute.path);

        if (currentRoute.redirect) {
          currentRoute.redirect =
            currentRoute.redirect.substr(0, 1) === '/'
              ? currentRoute.redirect
              : (parentPath || '') + '/' + currentRoute.redirect;
        }
      }

      // if (process.env.NODE_ENV !== 'start' && currentRoute.path === '/test') {
      //   return prevRoutes;
      // } else if (currentRoute.children) {
      //   const children = recursionRoutes(currentRoute.children, currentRoute.path);
      //   NotFound && children.push(cloneDeep(NotFound));
      //   if (currentRoute.component) {
      //     currentRoute.children = children;
      //     return prevRoutes.concat([currentRoute]);
      //   } else {
      //     return prevRoutes.concat(children);
      //   }
      // } else {
      //   return prevRoutes.concat(currentRoute);
      // }
      if (currentRoute.children) {
        const children = recursionRoutes(currentRoute.children, currentRoute.path);
        NotFound && children.push(cloneDeep(NotFound));
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
  return NotFound && isEndConcat ? recursionRoutes(routes).concat(NotFound) : recursionRoutes(routes);
};

// 路由转化为菜单
export const routesToMenus = (routes) => {
  return routes.filter((route) => {
    if (route.children) {
      // if (route.children[0] && route.children[0].path) {
      //   route.path = route.children[0].path;
      // }
      route.children = routesToMenus(route.children);
    }
    return !route.hidden;
  });
};

export const getCurrentUrlPath = () => {
  const { origin, pathname, hash } = window.location;
  const path = (origin + pathname + hash).replace(address.SERVER_ADDRESS, '');
  const url = encodeURIComponent(path);

  return '?url=' + url;
};

export const goto = (targetPath) => {
  window.location.href= address.SERVER_ADDRESS + targetPath;
};