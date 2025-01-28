import React from "react";
import Progress from "../ui/Progress";
import useGameStore from "../../store/gameStore";
import { RGB } from "../../types/index";

const RGBVisualizer = () => {
  const { currentColor, targetColor, activeChannel } = useGameStore();

  const getChannelColor = (channel: keyof RGB | null) => {
    switch (channel) {
      case "r":
        return `rgb(${currentColor.r}, 0, 0)`;
      case "g":
        return `rgb(0, ${currentColor.g}, 0)`;
      case "b":
        return `rgb(0, 0, ${currentColor.b})`;
      default:
        return "rgba(0, 0, 0, 0.5)";
    }
  };

  if (activeChannel) {
    const current = currentColor[activeChannel];
    const target = targetColor[activeChannel];
    const fillPercentage = (current / 255) * 100;

    return (
      <div className="w-[5%] h-[30%] flex flex-col items-center justify-center">
        <div className="relative h-full w-2">
          <Progress
            value={fillPercentage}
            orientation="vertical"
            color={getChannelColor(activeChannel)}
          />
          <div
            className="absolute left-0 w-full h-0.5 bg-black"
            style={{ bottom: `${(target / 255) * 100}%` }}
          />
        </div>
        <span className="nico mt-2 text-sm font-medium text-center">
          {current}
        </span>
      </div>
    );
  }

  // Default state
  return (
    <div className="w-[5%] h-[30%] flex flex-col items-center justify-center">
      <div className="relative h-full w-2">
        <Progress value={0} orientation="vertical" color="rgba(0, 0, 0, 0.5)" />
        <div
          className="absolute left-0 w-full h-0.5 bg-black"
          style={{ bottom: "0%" }}
        />
      </div>
      <span className="nico mt-2 text-sm font-medium text-center">0</span>
    </div>
  );
};

export default RGBVisualizer;
