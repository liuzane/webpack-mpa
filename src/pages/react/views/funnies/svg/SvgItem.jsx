// 基础模块
import React from 'react';

const SvgItem = ({ children }) => {
  return (
    <li className="svg-wrapper">
      <svg className="svg">{ children }</svg>
    </li>
  );
};

export default SvgItem;