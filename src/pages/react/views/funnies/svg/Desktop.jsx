// 基础模块
import React, { PureComponent } from 'react';

// 布局组件
import { LayContent } from '@-react/layouts/LayMain';

// 样式
import './style/Desktop.less';

// 组件
import SvgItem from './SvgItem';


class Desktop extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  computed(x = 0, y = 0, R = 50, r = 20) {
    let points = '';

    // 这里本是渲染5次，10个顶点，但由于最后一个顶点没有与第一个顶点链接，造成了在加上边框后最后一条边没有边框，故多渲染一点与第一个顶点重合
    for (let i = 0; i < 6; i ++) {
      points = points
        + (Math.cos((18 + i * 72) / 180 * Math.PI) * R + x)
        + ' '
        + (- Math.sin((18 + i * 72) / 180 * Math.PI) * R + y)
        + ', '
        + (Math.cos((54 + i * 72) / 180 * Math.PI) * r + x)
        + ' '
        + (- Math.sin((54 + i * 72) / 180 * Math.PI) * r + y)
        + (i === 5 ? '' : ', ');
    }

    return points;
  }

  render() {
    return (
      <LayContent>
        <ul className="svg-container">
          <SvgItem>
            <defs>
              <g id="microscope-column">
                <polyline
                  points="7.5,15 7.5,5 22.5,5 22.5,15"
                  fill="none"
                  stroke="silver"
                  strokeWidth="10"
                  strokeLinejoin="round"
                />

                <rect
                  x="0"
                  y="20"
                  width="30"
                  height="60"
                  fill="none"
                  stroke="silver"
                  strokeWidth="10"
                  strokeLinejoin="round"
                />
              </g>

              <g id="microscope-main" style={{ transformOrigin: '55px 100px', transform: 'rotate(30deg)' }}>
                <circle
                  r="50"
                  cx="55"
                  cy="100"
                  fill="none"
                  stroke="black"
                  strokeWidth="10"
                  strokeDasharray="215"
                  strokeDashoffset="0"
                  style={{ transformOrigin: '55px 100px', transform: 'rotate(-90deg)' }}
                />

                <use
                  href="#microscope-column"
                  x="20"
                  y="5"
                />

                <line
                  x1="5"
                  y1="120"
                  x2="55"
                  y2="120"
                  stroke="lightblue"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </g>

              <g id="microscope-footer">
                <polyline
                  points="15,5 5,35 65,35 55,5"
                  fill="none"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="10"
                />
              </g>
            </defs>

            <use
              href="#microscope-footer"
              x="25"
              y="145"
            />

            <use
              href="#microscope-main"
              x="5"
              y="0"
            />
          </SvgItem>

          <SvgItem>
            <defs>
              <g id="conical-flask">
                <path
                  d="
                    M 24 84
                    L 10 100
                    Q 0 110, 10 120
                    H 110
                    Q 120 110, 110 100
                    L 96 84
                    Z
                  "
                  fill="#7DBE23"
                />

                <path
                  d="
                    M 43 0
                    H 45
                    V 60
                    L 10 100
                    Q 0 110, 10 120
                    H 110
                    Q 120 110, 110 100
                    L 75 60
                    V 0
                    H 77
                  "
                  stroke="lightblue"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="transparent"
                />
              </g>

              <g id="test-tube">
                <path
                  d="
                    M 4 70
                    V 100
                    C 4 130, 34 130, 34 100
                    V 70
                    Z
                  "
                  fill="#CDEBF2"
                />

                <path
                  d="
                    M 0 0
                    H 4
                    V 100
                    C 4 130, 34 130, 34 100
                    V 0
                    H 38
                  "
                  stroke="lightblue"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="transparent"
                />
              </g>
            </defs>

            <use
              href="#conical-flask"
              x="100"
              y="10"
            />

            <use
              href="#test-tube"
              x="10"
              y="10"
            />
          </SvgItem>

          <SvgItem>
            <path
              d="
                M 18 3
                L 46 3
                L 46 40
                L 61 40
                L 32 68
                L 3 40
                L 18 40
                Z
              "
              stroke="black"
              fill="transparent"
            />
          </SvgItem>

          <SvgItem>
            <line
              x1="30"
              y1="90"
              x2="270"
              y2="90"
              stroke="black"
              strokeLinecap="round"
              strokeWidth="10"
            />
          </SvgItem>

          <SvgItem>
            <polyline
              points="30,10 10,30 80,30 60,10"
              fill="none"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="10"
            />
          </SvgItem>

          <SvgItem>
            <polyline
              points="10,30 10,10 30,10 30,30"
              fill="none"
              stroke="black"
              strokeLinejoin="round"
              strokeWidth="10"
            />
          </SvgItem>

          <SvgItem>
            <polyline
              points={this.computed(100, 100, 50, 20)}
              fill="red"
              stroke="orange"
              strokeWidth="3"
            />

            <polyline
              points={this.computed(300, 100, 50, 30)}
              fill="red"
              stroke="orange"
              strokeWidth="3"
            />
          </SvgItem>

          <SvgItem>
            <polygon
              fill="green"
              stroke="orange"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="150,10 100,60 125,110 175,110 200,60"
            />
          </SvgItem>

          <SvgItem>
            <defs>
              <path
                id="bar"
                d="
                  M 5 0
                  L 80 0
                  L 75 10
                  L 0 10
                  Z
                "
              />
            </defs>
            <use
              href="#bar"
              x="0"
              y="0"
              fill="blue"
            />
            <use
              href="#bar"
              x="100"
              y="0"
              fill="red"
            />
          </SvgItem>
        </ul>
      </LayContent>
    );
  }
}

export default Desktop;