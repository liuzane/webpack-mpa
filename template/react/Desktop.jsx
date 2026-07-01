// 基础模块
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// 第三方模块
import _ from 'lodash';

// API
import {  } from '@/api';

// 方法
import {  } from '@/utils/';

// UI组件
import {  } from 'antd';

// 公共组件
import  from '@/components';

// 样式
import './style/Desktop.less';

// 组件
import  from '';


class Desktop extends PureComponent {
  static propTypes = {
    string: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    className: '',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default Desktop;