import React from 'react';


const LayFlask = () => (
  <div className="login-layout__flask">
    <svg
      width="230"
      height="140"
      viewBox="0 0 230 140"
    >
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
            fill="#CDEBF2"
          >
            <animate
              attributeName="fill"
              attributeType="XML"
              begin="3s"
              dur="40s"
              repeatCount="indefinite"
              values="#CDEBF2; Gold; YellowGreen; LightSlateBlue; DarkMagenta; Crimson; HotPink; #CDEBF2"
            />
          </path>

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
    </svg>
  </div>
);

export default LayFlask;