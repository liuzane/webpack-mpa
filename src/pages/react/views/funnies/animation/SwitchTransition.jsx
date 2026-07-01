// 基础模块
import React, { PureComponent } from 'react';

// 样式
import './style/SwitchTransition.less';

// 动画
import { CSSTransition, SwitchTransition } from 'react-transition-group';

// 组件
import AnimationWrapper from './AnimationWrapper';


class SwitchTransitionDesktop extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [ 'A', 'B', 'C' ],
      current: 'A',
    };
  }

  handleTrigger = (current) => {
    this.setState({ current });
  };

  render() {
    const { list, current } = this.state;

    return (
      <AnimationWrapper title="SwitchTransition">
        {
          list.map(item => (
            <button key={ item } onClick={ this.handleTrigger.bind(this, item) }>{ item }</button>
          ))
        }

        <div className="switch-transition__container">
          <SwitchTransition>
            <CSSTransition
              key={ current }
              timeout={ 2000 }
              mountOnEnter
              unmountOnExit
              appear
              classNames="animation-left"
            >
              <p className="switch-transition__item">{ current }</p>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </AnimationWrapper>
    );
  }
}

export default SwitchTransitionDesktop;