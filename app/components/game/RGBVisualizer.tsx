import React from "react";
import Progress from "../ui/Progress";
import useGameStore from "../../store/gameStore";
import { RGB } from "../../types/index";
import Image from "next/image";

type RGBVisualizerProps = {
  currentColor: RGB;
};

const RGBVisualizer = ({ currentColor }: RGBVisualizerProps) => {
  const { activeChannel } = useGameStore();

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
    const fillPercentage = (current / 255) * 100;

    return (
      <div className="w-[10%] h-[30%] flex flex-col items-center justify-center">
        <div className="relative h-full flex gap-2">
          <Progress
            value={fillPercentage}
            orientation="vertical"
            color={getChannelColor(activeChannel)}
            background={false}
          />
          <Image
            src={"/meter.svg"}
            width={20}
            height={20}
            className="h-full object-cover"
            alt=""
          />
        </div>
        <span className="w-full flex justify-end px-1 nico mt-2 text-sm font-medium text-center">
          {current}
        </span>
      </div>
    );
  }

  // Default state
  return (
    <div className="w-[10%] h-[30%] flex flex-col items-center justify-center">
      <div className="relative h-full flex gap-2">
        <Progress
          value={0}
          orientation="vertical"
          color="rgba(0, 0, 0, 0.5)"
          background={false}
        />
        <Image
          src={"/meter.svg"}
          width={20}
          height={20}
          className="h-full object-cover"
          alt=""
        />
      </div>
      <span className="w-full flex justify-end px-1 nico mt-2 text-sm font-medium text-center">
        0
      </span>
    </div>
  );
};

export default RGBVisualizer;
