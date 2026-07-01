// 基础模块
import React, { Component } from 'react';

// 布局组件
import { LayContent } from '@-react/layouts/LayMain';

const files = require.context('./my_module', false, /\.js$/);
console.log(files.keys());

console.log(files('./bar.js'), 7);

export default class Desktop extends Component {
  render() {
    return (
      <LayContent>
        ES6 Module 语法测试
      </LayContent>
    );
  }
}