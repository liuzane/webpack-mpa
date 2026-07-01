// 基础模块
import React, { PureComponent } from 'react';

// 多语言组件
import { FormattedMessage } from 'react-intl';

// 样式
import './style/LayLogin.less';

// 组件
// import LayFlask from './LayFlask';
// import LayMicroscope from './LayMicroscope';


export default class LayLogin extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      special: true, // 默认开启特效
    };
    
    this.width = 0;
    this.height = 0;
    this.point = 35;
    
    this.canvas = null;
    this.context = null;
    this.circles = [];
    this.drawTime = null;
  }
  
  componentDidMount() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    this.width = width;
    this.height = height;
    
    const canvas = document.getElementById('MyCanvas');
    canvas.width = width;
    canvas.height = height;
    this.canvas = canvas;
    
    this.getContext();
    
    this.init();
    this.drawTime = setInterval(() => {
      for (let i = 0; i < this.point; i++) {
        let cir = this.circles[i];
        cir.x += cir.moveX;
        cir.y += cir.moveY;
        if (cir.x > width) cir.x = 0;
        else if (cir.x < 0) cir.x = width;
        if (cir.y > height) cir.y = 0;
        else if (cir.y < 0) cir.y = height;
      }
      this.draw();
    }, 50);
  }
  
  componentWillUnmount() {
    clearInterval(this.drawTime);
  }
  
  getContext = () => {
    const context = this.canvas.getContext('2d');
    context.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    context.strokeWidth = 1;
    context.fillStyle = 'rgba(0, 0, 0, 0.1)';
    return this.context = context;
  };
  
  // 线条：开始xy坐标，结束xy坐标，线条透明度
  line = (beginX, beginY, closeX, closeY, opacity) => {
    return {
      beginX,
      beginY,
      closeX,
      closeY,
      opacity,
    };
  };
  
  // 点：圆心xy坐标，半径，每帧移动xy的距离
  circle = (x, y, radius, moveX, moveY, color) => {
    return {
      x,
      y,
      radius,
      moveX,
      moveY,
      color,
    };
  };
  
  // 生成max和min之间的随机数
  num = (max, min) => {
    min = min || 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  
  // 绘制原点
  drawCricle = (cxt, x, y, radius, moveX, moveY, color) => {
    let circle = this.circle(x, y, radius, moveX, moveY, color);
    cxt.beginPath();
    cxt.fillStyle = circle.color;
    cxt.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    cxt.fill();
    cxt.closePath();
    return circle;
  };
  
  // 绘制线条
  drawLine = (cxt, beginX, beginY, closeX, closeY, opacity) => {
    let line = this.line(beginX, beginY, closeX, closeY, opacity);
    cxt.beginPath();
    cxt.strokeStyle = 'rgba(0, 0, 0, ' + opacity + ')';
    cxt.moveTo(line.beginX, line.beginY);
    cxt.lineTo(line.closeX, line.closeY);
    cxt.closePath();
    cxt.stroke();
  };
  
  // 每帧绘制
  draw = () => {
    let context = this.context;
    const canvas = this.canvas;
    const point = this.point;
    const circles = this.circles;
    
    try {
      context.clearRect(0, 0, canvas.width, canvas.height);
    } catch (e) {
      context = this.getContext();
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    for (let i = 0; i < point; i++) {
      let circle = circles[i];
      this.drawCricle(
        context,
        circle.x,
        circle.y,
        circle.radius,
        null,
        null,
        circle.color,
      );
    }
    
    for (let i = 0; i < point; i++) {
      for (let j = 0; j < point; j++) {
        if (i + j < point) {
          let A = Math.abs(circles[i + j].x - circles[i].x);
          let B = Math.abs(circles[i + j].y - circles[i].y);
          let lineLength = Math.sqrt(A * A + B * B);
          let C = 1 / lineLength * 7 - 0.009;
          let lineOpacity = C > 0.03 ? 0.03 : C;
          
          if (lineOpacity > 0) {
            this.drawLine(
              context,
              circles[i].x,
              circles[i].y,
              circles[i + j].x,
              circles[i + j].y,
              lineOpacity
            );
          }
        }
      }
    }
  };
  
  // 初始化生成原点
  init = () => {
    const circles = [];
    for (let i = 0; i < this.point; i++) {
      circles.push(this.drawCricle(
        this.context,
        this.num(this.width),
        this.num(this.height),
        this.num(15, 2),
        this.num(20, -20) / 40,
        this.num(20, -20) / 40,
        `rgba(${ this.num(255) }, ${ this.num(255) }, ${ this.num(255) }, .15)`
      ));
    }
    this.circles = circles;
    this.draw();
  };
  
  handleSpecial = () => {
    const special = !this.state.special;
    if (special) {
      this.drawTime = setInterval(() => {
        for (let i = 0; i < this.point; i++) {
          let cir = this.circles[i];
          cir.x += cir.moveX;
          cir.y += cir.moveY;
          if (cir.x > this.width) cir.x = 0;
          else if (cir.x < 0) cir.x = this.width;
          if (cir.y > this.height) cir.y = 0;
          else if (cir.y < 0) cir.y = this.height;
        }
        this.draw();
      }, 50);
    } else {
      clearInterval(this.drawTime);
    }
    
    this.setState({ special });
  };
  
  render() {
    return (
      <div className="login-layout">
        <canvas id="MyCanvas"/>

        {/* <LayLoginFlask /> */}
        {/* <LayLoginMicroscope /> */}

        <button
          className="login-layout__switch"
          onClick={ this.handleSpecial }
        >
          <FormattedMessage id={ this.state.special ? 'login.offSpecial' : 'login.onSpecial' } />
        </button>

        <div className="login-layout__content">
          { this.props.children }
        </div>
      </div>
    );
  }
}