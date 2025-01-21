import React from "react";

type Props = {
  direction: "left" | "right";
  score: boolean;
  fontSize?: number;
};
const SvgDeco = ({ direction, score, fontSize }: Props) => {
  return (
    <div className="relative">
      {score ? (
        <div
          style={{ fontSize: `${fontSize}rem` }}
          className="nico z-[10] absolute top-1/2 right-[8%] -translate-x-1/2 -translate-y-1/2 opacity-50"
        >
          000
        </div>
      ) : null}

      <svg
        style={{ transform: direction === "left" ? "scaleX(1)" : "scaleX(-1)" }}
        width="385"
        height="275"
        viewBox="0 0 385 275"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_i_70_839)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 67.0325V201.069L33.6001 247.39H208.707L230.079 274H373.421H376.83C388.661 217.634 399.454 91.5439 290.564 1H284.564H145.18L116.458 24.9605H37.845L1 67.0325Z"
            fill="white"
          />
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 67.0325V201.069L33.6001 247.39H208.707L230.079 274H373.421H376.83C388.661 217.634 399.454 91.5439 290.564 1H284.564H145.18L116.458 24.9605H37.845L1 67.0325Z"
          stroke="#E0E0E0"
          stroke-width="0.5"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 283 231)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 270 231)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 257 231)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 244 231)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 283 240)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 270 240)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 257 240)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 244 240)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 283 249)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 270 249)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 257 249)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 244 249)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 363 231)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 350 231)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 337 231)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 324 231)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 363 240)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 350 240)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 337 240)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 324 240)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 363 249)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 350 249)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 337 249)"
          fill="#D9D9D9"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-1 0 0 1 324 249)"
          fill="#D9D9D9"
        />
        <rect
          width="4"
          height="100"
          rx="2"
          transform="matrix(-1 0 0 1 25 92)"
          fill="#D9D9D9"
        />
        <defs>
          <filter
            id="filter0_i_70_839"
            x="0.75"
            y="0.75"
            width="383.5"
            height="275.5"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="4" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect1_innerShadow_70_839"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default SvgDeco;
