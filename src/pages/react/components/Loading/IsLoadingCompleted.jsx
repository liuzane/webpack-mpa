// 基础模块
import { Component } from 'react';
import PropTypes from 'prop-types';

// 第三方模块
import { fromJS, is } from 'immutable';


class IsLoadOver extends Component {
  static propTypes = {
    isLoadOver: PropTypes.any,
    children: PropTypes.node
  };

  shouldComponentUpdate (nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
  }

  render () {
    return (
      this.props.isLoadOver ? this.props.children : null
    );
  }
}

export default IsLoadOver;