import React from 'react';


const LayMicroscope = () => (
  <div className="login-layout__microscope">
    <svg
      width="130"
      height="190"
      viewBox="0 0 130 190"
    >
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
        x="30"
        y="145"
      />

      <use
        href="#microscope-main"
        x="10"
        y="0"
      />
    </svg>
  </div>
);

export default LayMicroscope;