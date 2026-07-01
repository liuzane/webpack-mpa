// 基础模块
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// 动画
import { CSSTransition } from 'react-transition-group';

// 样式
import './style/ScreenLoading.less';


class ScreenLoading extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    children: PropTypes.node,
  };

  static defaultProps = {
    loading: true,
  };
  
  render() {
    const { loading, children } = this.props;

    return (
      <CSSTransition
        in={ loading }
        timeout={ 300 }
        appear
        mountOnEnter
        unmountOnExit
        classNames="screen-loading-fade"
      >
        <div className="screen-loading">
          <div className="screen-loading__viewbox">
            <svg
              fill="#2d8cf0"
              height="100%"
              viewBox="0 0 25 30"
              width="100%"
            >
              <rect
                height="11.3922"
                rx="1.5"
                ry="1.5"
                width="4"
                x="0"
                y="9.80392"
              >
                <animate
                  attributeName="height"
                  attributeType="XML"
                  begin="0s"
                  dur="0.6s"
                  repeatCount="indefinite"
                  values="5;21;5"
                />
                <animate
                  attributeName="y"
                  attributeType="XML"
                  begin="0s"
                  dur="0.6s"
                  repeatCount="indefinite"
                  values="13; 5; 13"
                />
              </rect>
              <rect
                height="19.3922"
                rx="1.5"
                ry="1.5"
                width="4"
                x="10"
                y="5.80392"
              >
                <animate
                  attributeName="height"
                  attributeType="XML"
                  begin="0.15s"
                  dur="0.6s"
                  repeatCount="indefinite"
                  values="5;21;5"
                />
                <animate
                  attributeName="y"
                  attributeType="XML"
                  begin="0.15s"
                  dur="0.6s"
                  repeatCount="indefinite"
                  values="13; 5; 13"
                />
              </rect>
              <rect
                height="14.6078"
                rx="1.5"
                ry="1.5"
                width="4"
                x="20"
                y="8.19608"
              >
                <animate
                  attributeName="height"
                  attributeType="XML"
                  begin="0.3s"
                  dur="0.6s"
                  repeatCount="indefinite"
                  values="5;21;5"
                />
                <animate
                  attributeName="y"
                  attributeType="XML"
                  begin="0.3s"
                  dur="0.6s"
                  repeatCount="indefinite"
                  values="13; 5; 13"
                />
              </rect>
            </svg>
            <p className="screen-loading__text">{ children || 'Wecome to React Laboratory' }</p>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

export default ScreenLoading;