import React from "react";

const Add = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="74"
      height="74"
      viewBox="0 0 108 100"
      fill="none"
    >
      <g filter="url(#filter0_d_33_690)">
        <path
          d="M54 73C39.0876 73 27 60.9124 27 46C27 31.0876 39.0876 19 54 19C68.9124 19 81 31.0876 81 46C81 60.9124 68.9124 73 54 73Z"
          fill="#AD8C3B"
        />
      </g>
      <path
        d="M43.2 47.8L64.8 47.8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M54 35.2001V58.6001"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="filter0_d_33_690"
          x="0"
          y="0"
          width="108"
          height="108"
          filterUnits="userSpaceOnUse"
          colorInterpolation-filters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="13.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.678431 0 0 0 0 0.54902 0 0 0 0 0.231373 0 0 0 0.63 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_33_690"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_33_690"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Add;
