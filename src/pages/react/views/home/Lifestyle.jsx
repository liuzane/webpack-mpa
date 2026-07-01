// 基础模块
import React, { PureComponent } from 'react';

// api
import api, { axios } from '@/api';

// UI组件库
import { message } from 'antd';


class Lifestyle extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      loading: false,
      lifestyle: [],
    };
    this.lifestyleTypes = {
      comf: '舒适度指数',
      cw: '洗车指数',
      drsg: '穿衣指数',
      flu: '感冒指数',
      sport: '运动指数',
      trav: '旅游指数',
      uv: '紫外线指数',
      air: '空气污染扩散条件指数',
      ac: '空调开启指数',
      ag: '过敏指数',
      gl: '太阳镜指数',
      mu: '化妆指数',
      airc: '晾晒指数',
      ptfc: '交通指数',
      fsh: '钓鱼指数',
      spi: '防晒指数',
    };
    this.source = axios.CancelToken.source();
  }

  componentDidMount () {
    this.getWeaterByType();
  }

  // 请求生活指数信息
  getWeaterByType = () => {
    const params = {
      type: 'lifestyle',
      location: 'auto_ip',
      key: '81c887d621274b71ad5e694d0f6e94c4',
    };
    this.setState({ loading: true });
    api.getWeaterByType(params, { cancelToken: this.source.token }).then(
      response => {
        console.log('response', response);
        const lifestyle = this.handleLifestyle(response.lifestyle);
        this.setState({ loading: false, lifestyle });
      },

      error => {
        if (!axios.isCancel(error)) {
          message.error(error.message);
          this.setState({ loading: false });
        }
      }
    );
  };

  // 处理 lifestyle
  handleLifestyle = (lifestyle) => {
    return lifestyle.map(item => {
      item.typeText = this.lifestyleTypes[item.type];
      item.color = this.randomColor(item.typeText);
      return item;
    });
  };

  // 随机颜色
  randomColor = (txt) => {
    const firstWord = txt[0];
    const hexadecimal = firstWord.charCodeAt(0).toString(16).slice(0, 4);
    return `#a${ hexadecimal }f`;
  };

  render () {
    return (
      <ul className="lifestyle">
        {
          this.state.lifestyle.map(item => (
            <li
              key={ item.type }
              className="lifestyle__item"
              title={ item.txt }
            >
              <span className="lifestyle__tag" style={{ backgroundColor: item.color }} />
              <p><b>{ item.typeText }</b>：{ item.brf }</p>
              <p className="lifestyle__txt">{ item.txt }</p>
            </li>
          ))
        }
      </ul>
    );
  }
}

export default Lifestyle;