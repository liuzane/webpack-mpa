// 基础模块
import React, { memo } from 'react';

// 样式
import './style/AnimationWrapper.less';


const AnimationWrapper = (props) => (
  <div className="animation-wrapper">
    <h3 className="animation-wrapper__title">{ props.title }</h3>
    { props.children }
  </div>
);

export default memo(AnimationWrapper);