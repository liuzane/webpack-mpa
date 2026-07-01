// 基础模块
import React, { Component } from 'react';

// 样式
import './style/NotFound.css';


class NotFound extends Component {
	render () {
		return (
			<div className="not-found">
        <img
          alt=""
          className="not-found__img"
          src={ require('./style/404.png') }
        />
        <p className="not-found__text">哎呀迷路了...</p>
        <div className="not-found__reason">
          <p>可能的原因：</p>
          <ul className="not-found__reason-list">
            <li>原来的页面不存在了</li>
            <li>您的权限不够</li>
            <li>我们的服务器被外星人劫持了</li>
          </ul>
        </div>
      </div>
		);
	}
}

export default NotFound;