// 基础模块
import React, { PureComponent } from 'react';

// 样式
import './style/Home.less';

// 组件
import Weather from './Weather';
import Lifestyle from './Lifestyle';
import Calendar from '@-react/components/Calendar';


class Home extends PureComponent {
  constructor (props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render () {
    return (
      <div className="home">
        <ul className="home-container">
          <li className="home-block">
            <Weather />
          </li>
          <li className="home-block">
            <Lifestyle />
          </li>
          <li className="home-block">
            <Calendar></Calendar>
          </li>
          <li className="home-block"></li>
        </ul>
      </div>
    );
  }
}

export default Home;