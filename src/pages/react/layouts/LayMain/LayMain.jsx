// 基础模块
import React, { memo } from 'react';

// 第三方模块
import classnames from 'classnames';

// 样式
import './style/LayMain.css';


const LayMain = props => (
  <article
    className={ classnames('layout', props.className) }
    style={ props.style }
  >
    { props.children }
  </article>
);

export default memo(LayMain);