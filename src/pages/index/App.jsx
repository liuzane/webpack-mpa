// 基础模块
import React, { PureComponent } from 'react';

// 样式
import './App.css';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePosition: null,
    };
    this.entrances = [
      {
        title: 'React',
        /* eslint-disable-next-line no-undef */
        href: `${PUBLIC_URL}/react.html`,
        img: require('./images/react-logo.png'),
      },
      {
        title: 'Vue',
        /* eslint-disable-next-line no-undef */
        href: `${PUBLIC_URL}/vue.html`,
        img: require('./images/vue-logo.png'),
      },
    ];
  }

  // 鼠标切入方向
  onMouseDirection = (event) => {
    const target = event.currentTarget;
    const width = target.clientWidth;
    const height = target.clientHeight;
    const x = (event.pageX - target.offsetLeft - (width / 2)) * (width > height ? (height / width) : 1);
    const y = (event.pageY - target.offsetTop - (height / 2)) * (height > width ? (width / height) : 1);
    const res = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
    const directions = {
      0: 'up',
      1: 'right',
      2: 'down',
      3: 'left',
    };
    return directions[res];
  }

  onMouseEnter = (event) => {
    const target = event.currentTarget;
    this.setState({
      activePosition: {
        top: target.offsetTop,
        left: target.offsetLeft,
      }
    });
  }

  onMouseLeave = (event) => {
    const direction = this.onMouseDirection(event);
    const activePosition = { ...this.state.activePosition };
    switch (direction) {
      case 'up':
        activePosition.top = - 160;
        break;

      case 'right':
        activePosition.left = '100%';
        break;

      case 'down':
        activePosition.top = '100%';
        break;

      case 'left':
        activePosition.left = - 160;
        break;
    }
    this.setState({ activePosition });
  }

  render() {
    const { activePosition } = this.state;

    return (
      <div className="index">
        <ul className="index__entrance" onMouseLeave={ this.onMouseLeave }>
          <li
            className="index__entrance-active"
            style={ activePosition ? { ...activePosition } : null }
          />
          {
            this.entrances.map((item, index) => (
              <li
                key={ index }
                className="index__entrance-item"
                onMouseEnter={ this.onMouseEnter }
              >
                <a href={ item.href } className="index__entrance-link">
                  {
                    item.img
                      ? <img
                        src={ item.img }
                        alt={ item.title }
                        className="index__entrance-img"
                        />
                      : <span>{ item.title }</span>
                  }
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}