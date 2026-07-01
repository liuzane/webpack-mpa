// 基础模块
import React, { PureComponent } from 'react';

// 样式
import './style/CSSTransition.less';

// 动画
import { CSSTransition } from 'react-transition-group';

// 组件
import AnimationWrapper from './AnimationWrapper';


class CSSTransitionDesktop extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleShow = () => {
    const { visible } = this.state;

    this.setState({ visible: !visible });
  };

  render() {
    const { visible } = this.state;
    
    return (
      <AnimationWrapper title="CSSTransition">
        <button onClick={ this.handleShow }>切换</button>
        <div className="css-transition__box">
          <CSSTransition
            in={ visible }
            timeout={ 300 }
            mountOnEnter
            unmountOnExit
            classNames="animation-slide"
            onEntered={ () => console.log('entered') }
            onExited={ () => console.log('exited') }
          >
            <p className="css-transition__text">显示</p>
          </CSSTransition>
        </div>
      </AnimationWrapper>
    );
  }
}

export default CSSTransitionDesktop;