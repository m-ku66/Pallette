import React, { useState, useRef, useEffect } from "react";
import { RGB } from "@/app/types";
import { motion } from "framer-motion";
import useGameStore from "../../store/gameStore";
import calculateColorDifference from "./ColorCalculator";
import { CharacterState } from "@/app/types";

interface Coordinate {
  x: number;
  y: number;
}

interface CircularSliderProps {
  value: number;
  onChange: (value: number) => void;
  color: string;
  radius: number;
  size: number;
  channel: keyof RGB;
  setActiveChannel: (channel: keyof RGB | null) => void;
}

interface ColorMixerProps {
  size?: number;
  currentColor: RGB;
  setCurrentColor: React.Dispatch<React.SetStateAction<RGB>>;
  setCharacterState: React.Dispatch<React.SetStateAction<CharacterState>>;
}

const CircularSlider: React.FC<CircularSliderProps> = ({
  value,
  onChange,
  color,
  radius,
  size,
  channel,
  setActiveChannel,
}) => {
  const sliderRef = useRef<SVGGElement>(null);
  const isDragging = useRef<boolean>(false);
  const lastValidValue = useRef<number>(value);

  const centerX = size / 2;
  const centerY = size / 2;
  const startAngle = 135;
  const endAngle = 405;
  const totalAngle = endAngle - startAngle;

  const angleToCoordinate = (angle: number): Coordinate => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(radian),
      y: centerY + radius * Math.sin(radian),
    };
  };

  const valueToAngle = (value: number): number => {
    return startAngle + (value / 255) * totalAngle;
  };

  const normalizeAngle = (angle: number): number => {
    // Convert angle to 0-360 range
    angle = angle % 360;
    if (angle < 0) angle += 360;

    // If angle is less than startAngle, wrap it around
    if (angle < startAngle) angle += 360;

    return angle;
  };

  const angleToValue = (angle: number): number => {
    const normalizedAngle = normalizeAngle(angle);

    // Calculate how far along the arc we are
    let percentage: number;
    if (normalizedAngle > endAngle) {
      percentage = 1;
    } else if (normalizedAngle < startAngle) {
      percentage = 0;
    } else {
      percentage = (normalizedAngle - startAngle) / totalAngle;
    }

    // Clamp percentage between 0 and 1
    percentage = Math.max(0, Math.min(1, percentage));

    // Convert to value between 0 and 255
    return Math.round(percentage * 255);
  };

  const getAngleFromMouse = (e: MouseEvent): number => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - centerX * (rect.width / size);
    const y = e.clientY - rect.top - centerY * (rect.height / size);
    return Math.atan2(y, x) * (180 / Math.PI);
  };

  const handleMouseDown = (): void => {
    isDragging.current = true;
    setActiveChannel(channel);
  };

  const handleMouseUp = (): void => {
    isDragging.current = false;
    setActiveChannel(null);
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (!isDragging.current) return;
    const angle = getAngleFromMouse(e);
    const newValue = angleToValue(angle);
    if (!isNaN(newValue) && isFinite(newValue)) {
      lastValidValue.current = newValue;
      onChange(newValue);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const currentAngle = valueToAngle(value);

  const createArcPath = (startAngle: number, endAngle: number): string => {
    const start = angleToCoordinate(startAngle);
    const end = angleToCoordinate(endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      1,
      end.x,
      end.y,
    ].join(" ");
  };

  const end = angleToCoordinate(currentAngle);

  return (
    <g className="p-8" ref={sliderRef} onMouseDown={handleMouseDown}>
      <path
        d={createArcPath(startAngle, endAngle)}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d={createArcPath(startAngle, currentAngle)}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle
        cx={end.x}
        cy={end.y}
        r="8"
        fill={channel === "r" ? "red" : channel === "g" ? "green" : "blue"}
        stroke="#F8F8F8"
        strokeWidth="4"
        className="drop-shadow-md cursor-pointer"
      />
    </g>
  );
};

const ColorMixer: React.FC<ColorMixerProps> = ({
  size = 400,
  currentColor,
  setCurrentColor,
  setCharacterState,
}) => {
  const setActiveChannel = useGameStore((state) => state.setActiveChannel);
  const {
    targetColor,
    difficulty,
    updateScore,
    updateStreak,
    streak,
    startNewRound,
    resetGame,
    winStreak,
    updateWinStreak,
    increaseDifficulty,
    updateDifficulty,
    score,
    losingStreak,
    updateLosingStreak,
  } = useGameStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleColorChange = (color: keyof RGB, value: number): void => {
    setCurrentColor((prev) => ({
      ...prev,
      [color]: value,
    }));
  };

  const handleReset = (): void => {
    setCurrentColor({ r: 0, g: 0, b: 0 });
  };

  const sliderColors: Record<keyof RGB, string> = {
    r: `rgb(${currentColor.r}, 0, 0)`,
    g: `rgb(0, ${currentColor.g}, 0)`,
    b: `rgb(0, 0, ${currentColor.b})`,
  };

  const handleSubmit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    // Calculate difference and accuracy
    const diff = calculateColorDifference(targetColor, currentColor);
    const maxDiff = Math.sqrt(Math.pow(255, 2) * 3); // Maximum possible difference
    const accuracy = 100 - (diff / maxDiff) * 100;

    // Adjust these thresholds based on difficulty
    const perfectThreshold = 95 - difficulty * 2; // Gets harder as difficulty increases
    const goodThreshold = 85 - difficulty * 2;

    if (accuracy >= perfectThreshold) {
      // Perfect match!
      updateScore(10 + Math.floor(accuracy - perfectThreshold));
      updateStreak(streak + 1);
      updateWinStreak(1);

      if (winStreak > 0 && winStreak % 3 === 0) {
        // Every 3 perfect matches
        increaseDifficulty();
      }

      setCharacterState((prev) => ({
        ...prev,
        emotion: "surprised",
        state: "victory",
      }));
    } else if (accuracy >= goodThreshold) {
      // Good match
      updateScore(5);
      updateStreak(streak + 1);
      updateWinStreak(1);

      if (winStreak > 0 && winStreak % 5 === 0) {
        // Every 5 good matches
        increaseDifficulty();
      }

      setCharacterState((prev) => ({
        ...prev,
        emotion: "happy",
        state: "victory",
      }));
    } else {
      // Miss
      updateStreak(0); // Reset streak on miss
      updateWinStreak(winStreak - winStreak); // Reset win streak on miss
      updateScore(score === 0 ? 0 : -1); // Decrement score on miss
      updateLosingStreak(1);
      updateDifficulty(0);
      setCharacterState((prev) => ({
        ...prev,
        emotion: "disappointed",
        state: "defeat",
      }));
    }

    setCurrentColor({ r: 0, g: 0, b: 0 });

    // Add a small delay before allowing new submissions
    setTimeout(() => {
      setIsSubmitting(false);
      setCharacterState((prev) => ({
        ...prev,
        state: "neutral",
        emotion: "neutral",
      }));
      startNewRound();

      // If the game is over, reload the page
      if (losingStreak === 3) {
        resetGame();
        updateDifficulty(0);
        location.reload();
      }
    }, 1000);
  };

  const diamondSize = size / 14;

  return (
    <div className="w-full h-full flex flex-col gap-0 items-center justify-center bg-transparent pb-20">
      <div className="relative">
        <motion.svg
          style={{ border: "none", outline: "none" }}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 3}
            fill="#F8F8F8"
            className="drop-shadow-lg"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={size / 4.5}
            fill={`rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`}
            onClick={handleReset}
            className="cursor-pointer origin-center hover:scale-105 active:scale-95 transition-transform duration-200 ease-in-out"
            style={{ outline: "none" }}
          />
          <CircularSlider
            value={currentColor.r}
            onChange={(value) => handleColorChange("r", value)}
            color={sliderColors.r}
            radius={size / 2.06}
            size={size}
            channel="r"
            setActiveChannel={setActiveChannel}
          />
          <CircularSlider
            value={currentColor.g}
            onChange={(value) => handleColorChange("g", value)}
            color={sliderColors.g}
            radius={size / 2.3}
            size={size}
            channel="g"
            setActiveChannel={setActiveChannel}
          />
          <CircularSlider
            value={currentColor.b}
            onChange={(value) => handleColorChange("b", value)}
            color={sliderColors.b}
            radius={size / 2.6}
            size={size}
            channel="b"
            setActiveChannel={setActiveChannel}
          />
        </motion.svg>
      </div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ width: `${size / 6}px` }}
        onClick={handleSubmit}
        className={`flex justify-center items-center rounded-full aspect-square 
          bg-[#F8F8F8] drop-shadow-lg cursor-pointer
          ${isSubmitting ? "opacity-50" : ""}`}
      >
        <svg
          width={diamondSize}
          height={diamondSize}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.38134 14.3115L14.9678 2.59464C15.5013 1.94261 16.4982 1.94261 17.0317 2.59464L26.6182 14.3115C27.4218 15.2937 27.4218 16.7064 26.6182 17.6887L17.0317 29.4055C16.4982 30.0575 15.5013 30.0575 14.9678 29.4055L5.38134 17.6887C4.57764 16.7064 4.57764 15.2937 5.38134 14.3115Z"
            fill={`rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default ColorMixer;
