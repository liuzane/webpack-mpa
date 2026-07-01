// 基础模块
import React, { memo } from 'react';

// 路由模块
import { Route, Switch, Redirect } from 'react-router-dom';

// 嵌套路由容器
export default memo(({ routes }) => (
  <Switch>
    {
      routes.map((item, index) => (
        <Route
          key={ index }
          path={ item.path }
          exact={ item.exact }
          strict={ item.strict }
          render={
            props => item.redirect
              ? (<Redirect to={ item.redirect } />)
              : (<item.component { ...props } routes={ item.children } />)
          }
        />
      ))
    }
  </Switch>
));