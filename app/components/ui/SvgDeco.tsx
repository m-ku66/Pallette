import React, { useMemo } from "react";
import useGameStore from "../../store/gameStore";
import { motion } from "framer-motion";

type Props = {
  direction: "left" | "right";
  score: boolean;
  fontSize?: number;
};

// Create a separate memoized component for the score display
const ScoreDisplay = React.memo(
  ({ score, fontSize }: { score: number; fontSize?: number }) => {
    const paddedScore = useMemo(
      () => score.toString().padStart(3, "0"),
      [score]
    );

    return (
      <div
        style={{ fontSize: `${fontSize}rem` }}
        className="nico z-[10] absolute top-1/2 right-[8%] -translate-x-1/2 -translate-y-1/2 opacity-50 select-none"
      >
        {Array.from(paddedScore).map((digit, i) => (
          <motion.span
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1], y: [1, -1, 0] }}
            transition={{
              duration: 0.5,
              delay: 0.1 * i,
              ease: [0.87, 0, 0.13, 1],
            }}
            key={`${digit}-${i}`}
          >
            {digit}
          </motion.span>
        ))}
      </div>
    );
  }
);

ScoreDisplay.displayName = "ScoreDisplay";

// Memoize the SVG part since it only depends on direction
const SvgPart = React.memo(({ direction }: { direction: "left" | "right" }) => (
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
      strokeWidth="0.5"
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
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
));

SvgPart.displayName = "SvgPart";

const SvgDeco = React.memo(({ direction, score, fontSize }: Props) => {
  const currentScore = useGameStore((state) => state.score);
  const currentStreak = useGameStore((state) => state.streak);
  const currentDifficulty = useGameStore((state) => state.difficulty);
  const currentLosingStreak = useGameStore((state) => state.losingStreak);

  return (
    <div className="relative">
      {score && (
        <div className="flex flex-col items-center justify-center">
          <ScoreDisplay score={currentScore} fontSize={fontSize} />
          <p>Streak: {currentStreak}</p>
          <p>Difficulty: {currentDifficulty}</p>
          <p>Losing Streak: {currentLosingStreak}</p>
        </div>
      )}
      <SvgPart direction={direction} />
    </div>
  );
});

SvgDeco.displayName = "SvgDeco";

export default SvgDeco;
