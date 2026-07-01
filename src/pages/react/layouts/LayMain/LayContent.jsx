// 基础模块
import React, { memo } from 'react';

// 第三方模块
import classnames from 'classnames';


const LayContent = props => (
  <div
    className={ classnames('layout-scrolling', props.className) }
    style={ props.style }
  >
    <div className={ classnames('layout-content', props.noPadding ? 'layout--no-padding' : '') }>
      { props.children }
    </div>
  </div>
);

export default memo(LayContent);