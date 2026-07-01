// 基础模块
import React, { memo } from 'react';

// 第三方模块
import classnames from 'classnames';


const LaySection = props => (
  <section
    className={ classnames('layout-section', props.className) }
    style={ props.style }
  >
    { props.children }
  </section>
);

export default memo(LaySection);