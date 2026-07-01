// 基础模块
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// 路由模块
import { withRouter } from 'react-router-dom';

// 第三方模块
import { fromJS, is } from 'immutable';

// 容器组件
import Container from './Container';


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
    return (<Container routes={this.props.routes} />);
  }
}

export default withRouter(RouterView);