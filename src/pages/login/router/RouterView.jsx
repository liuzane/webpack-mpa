// 基础模块
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// 路由模块
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

// 第三方模块
import { fromJS, is } from 'immutable';


class RouterView extends PureComponent {
  static propTypes = {
    routes: PropTypes.array,
    onRouterEach: PropTypes.func,
  };

  static defaultProps = {
    onRouterEach: () => {},
  };
  
  componentDidUpdate(prevProps) {
    const [ to, from ] = [ this.props.location, prevProps.location ];

    if (!is(fromJS(to), fromJS(from))) {
      this.props.onRouterEach(to, from, this.props.history);
    }
  }

  render() {
    return (
      <Switch>
        {
          this.props.routes.map((item, index) => (
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
    );
  }
}

export default withRouter(RouterView);