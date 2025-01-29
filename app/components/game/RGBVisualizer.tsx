"use client";
import React from "react";
import Progress from "../ui/Progress";
import useGameStore from "../../store/gameStore";
import { RGB } from "../../types/index";
import Image from "next/image";

const ChannelDisplay = React.memo(
  ({ value, color }: { value: number; color: string }) => {
    return (
      <div className="relative h-full flex gap-2">
        <Progress
          value={(value / 255) * 100}
          orientation="vertical"
          color={color}
          background={false}
        />
        <Image
          src="/meter.svg"
          width={20}
          height={20}
          className="h-full object-cover"
          alt=""
        />
      </div>
    );
  }
);

ChannelDisplay.displayName = "ChannelDisplay";

const ValueDisplay = React.memo(({ value }: { value: number }) => (
  <span className="w-full flex justify-end px-1 nico mt-2 text-sm font-medium text-center">
    {value}
  </span>
));

ValueDisplay.displayName = "ValueDisplay";

const RGBVisualizer = React.memo(({ currentColor }: { currentColor: RGB }) => {
  const activeChannel = useGameStore((state) => state.activeChannel);

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
    return (
      <div className="w-[10%] h-[30%] flex flex-col items-center justify-center">
        <ChannelDisplay
          value={current}
          color={getChannelColor(activeChannel)}
        />
        <ValueDisplay value={current} />
      </div>
    );
  }

  return (
    <div className="w-[10%] h-[30%] flex flex-col items-center justify-center">
      <ChannelDisplay value={0} color="rgba(0, 0, 0, 0.5)" />
      <ValueDisplay value={0} />
    </div>
  );
});

RGBVisualizer.displayName = "RGBVisualizer";

export default RGBVisualizer;
