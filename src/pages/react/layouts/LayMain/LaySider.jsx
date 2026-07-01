// 基础模块
import React, { memo } from 'react';

// 第三方模块
import classnames from 'classnames';

// logo
import logo from './style/logo.svg';

const cls = function (postfix = '', ...className) {
  return classnames(`layout-sider${ postfix }`, ...className);
};


const LaySider = props => {
  return (
    <div
      className={ cls('', props.className) }
      style={ props.style }
    >
      <div className={ cls('__top') }>
        {/* eslint-disable-next-line no-undef */}
        <a href={PUBLIC_URL}>
          <img
            alt="logo"
            className={ cls('__logo') }
            src={ logo }
          />
        </a>
        <span className={ cls('__name') }>Laboratory</span>
      </div>
      { props.children }
    </div>
  );
};


export default memo(LaySider);