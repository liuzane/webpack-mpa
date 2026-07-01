// 基础模块
import React, { Component } from 'react';

// 第三方模块
import { fromJS, is } from 'immutable';

// 布局组件
import { LayContent } from '@-react/layouts/LayMain';


// 样式
// import styled from './style/Css.module.css';
// import styled from './style/Scss.scss';
import styles from './style/Less.module.less';
// import styled from './style/Css.css';

class Less extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
  }

  render() {
    return (
      <LayContent>
        <div className={ styles['container'] }>
          <div className={ styles['box'] }>box</div>
          <div className="box-global">box-global</div>
        </div>
      </LayContent>
    );
  }
}

export default Less;