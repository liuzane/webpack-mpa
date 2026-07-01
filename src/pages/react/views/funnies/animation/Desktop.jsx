// 基础模块
import React, { PureComponent } from 'react';

// 布局组件
import { LayContent } from '@-react/layouts/LayMain';

// 样式
import './style/Desktop.less';

// 组件
import CSSTransition from './CSSTransition';
import SwitchTransition from './SwitchTransition';
import TransitionGroup from './TransitionGroup';
// import SwitchTransitionGroup from './SwitchTransitionGroup';
import CSSModuleTransition from './CSSModuleTransition';


class Desktop extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <LayContent>
        <div className="animation">
          <CSSTransition />
          <SwitchTransition />
          <TransitionGroup />
          <CSSModuleTransition />
        </div>
      </LayContent>
    );
  }
}

export default Desktop;