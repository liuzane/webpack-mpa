// 基础模块
import React, { PureComponent } from 'react';

// 第三方模块
import _ from 'lodash';

// 样式
import './style/TransitionGroup.less';

// 动画
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// 组件
import AnimationWrapper from './AnimationWrapper';


const List = (props) => {
  return (<ul className="transition-group__list">{ props.children }</ul>);
};

class TransitionGroupDesktop extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  handleAdd = () => {
    const letter = 'abcefghijklmnopqrstuvwxyz';
    const list = _.cloneDeep(this.state.list);

    list.push(letter[Math.floor(Math.random() * 25)] + Math.floor(Math.random() * 25000));

    this.setState({ list });
  };

  handleRemove = (index) => {
    const list = _.cloneDeep(this.state.list);

    list.splice(index, 1);

    this.setState({ list });
  };

  render() {
    const { list } = this.state;

    return (
      <AnimationWrapper title="TransitionGroup">
        <button onClick={ this.handleAdd }>添加</button>
        <TransitionGroup component={ List } >
          {
            list.map((item, index) => (
              <CSSTransition
                key={ item }
                timeout={ 300 }
                classNames="animation-fade"
              >
                <li key={ item } onClick={ this.handleRemove.bind(this, index) }>{ item }</li>
              </CSSTransition>
            ))
          }
        </TransitionGroup>
      </AnimationWrapper>
    );
  }
}

export default TransitionGroupDesktop;