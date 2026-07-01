// 基础模块
import React, { PureComponent } from 'react';

// 样式
import styles from './style/CSSModuleTransition.module.less';

// 动画
import { CSSTransition } from 'react-transition-group';

// 组件
import AnimationWrapper from './AnimationWrapper';


class CSSModuleTransitionDesktop extends PureComponent {
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
      <AnimationWrapper title="CSSModuleTransition">
        <button onClick={ this.handleShow }>切换</button>
        <div className="css-transition__box">
          <CSSTransition
            in={ visible }
            timeout={ 30000 }
            mountOnEnter
            unmountOnExit
            classNames={{
              enter: styles['animation-spread-enter'],
              enterActive: styles['animation-spread-enter-active'],
              exit: styles['animation-exit-enter'],
              exitActive: styles['animation-spread-exit-active'],
            }}
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

export default CSSModuleTransitionDesktop;