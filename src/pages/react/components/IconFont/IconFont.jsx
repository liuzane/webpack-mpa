// 基础模块
import React from 'react';

// 样式
import '@/iconfont/iconfont.css';


const IconFont = props => {
  const className = `iconfont ${ props.type } ${ props.className }`.trim();
  const style = {
    fontSize: props.size + 'px',
    color: props.color,
    ...props.style,
  };

  return (
    <i
      { ...props }
      className={ className }
      style={ style }
    />
  );
};

export default IconFont;