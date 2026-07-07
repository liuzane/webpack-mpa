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
          <div className="home-calendar">
            <Calendar />
          </div>
        </ul>
      </div>
    );
  }
}

export default Home;