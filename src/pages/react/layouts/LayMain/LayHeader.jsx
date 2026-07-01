// 基础模块
import React, { memo } from 'react';

// 第三方模块
import classnames from 'classnames';


const LayHeader = props => (
  <header
    className={ classnames('layout-header', props.className ) }
    style={ props.style }
  >
    { props.children }
  </header>
);

export default memo(LayHeader);