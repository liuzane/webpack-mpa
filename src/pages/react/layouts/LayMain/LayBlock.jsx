// 基础模块
import React, { memo } from 'react';

// 第三方模块
import classnames from 'classnames';


const LayBlock = props => (
  <div
    className={ classnames('layout-block', props.className, props.noPadding ? 'layout--no-padding' : '') }
    style={ props.style }
  >
    { props.children }
  </div>
);

export default memo(LayBlock);