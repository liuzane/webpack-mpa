// 基础模块
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// 第三方模块
import { fromJS, is } from 'immutable';

// 样式
import './Style/Loading.css';


class Loading extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    fix: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    className: ''
  };

  constructor (props) {
    super(props);
    this.state = {
      className: ''
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
  }

  render () {
    let className = '';
    if (!this.props.loading) return null;
    if (this.props.fix) className = 'loading-fix ';

    return (
      <div 
        className={ ('loading-container ' + className + this.props.className).trim() } 
        style={ this.props.style }
      >
        <span className="loading-circle"></span>
      </div>
    );
  }
}

export default Loading;