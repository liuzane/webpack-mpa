// 基础模块
import React, { PureComponent } from 'react';

// 地址
import address from '@/address';

// 布局组件
import { LayContent } from '@-react/layouts/LayMain';

// 样式
import './style/Desktop.less';


class Desktop extends PureComponent {
  constructor() {
    super();
    this.src = address.SERVER_ADDRESS + '/solar-system.html';
  }

  render() {
    return (
      <LayContent className="myIframe" noPadding>
        <iframe
          src={ this.src }
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
        />
      </LayContent>
    );
  }
}

export default Desktop;