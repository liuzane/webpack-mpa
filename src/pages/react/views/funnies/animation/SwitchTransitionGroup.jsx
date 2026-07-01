// 基础模块
import React, { PureComponent } from 'react';

// 样式
import './style/SwitchTransition.less';

// 动画
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';

// 组件
import AnimationWrapper from './AnimationWrapper';


class SwitchTransitionGroupDesktop extends PureComponent {
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
      <AnimationWrapper title="SwitchTransitionGroup">
        {
          list.map(item => (
            <button key={ item } onClick={ this.handleTrigger.bind(this, item) }>{ item }</button>
          ))
        }

        <div className="switch-transition__container">

            <TransitionGroup>
              {
                list.map((item, index) => (
                  <SwitchTransition key={ item }>
                    <CSSTransition
                      in={ item === current }
                      timeout={ 300 }
                      classNames="animation-left"
                    >
                      <p className="switch-transition__item">{ item }</p>
                    </CSSTransition>
                  </SwitchTransition>
                ))
              }
            </TransitionGroup>
        </div>
      </AnimationWrapper>
    );
  }
}

export default SwitchTransitionGroupDesktop;