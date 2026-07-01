// 路由配置
import routes from './routes';

// 路由转化为菜单
const routesToMenus = (routes) => {
  return routes.filter((route) => {
    if (route.children) {
      route.children = routesToMenus(route.children);
    }
    return !route.hidden;
  });
};

export default routesToMenus(routes);