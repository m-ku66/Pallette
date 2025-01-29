"use client";
import React, { useMemo } from "react";
import { RGB } from "@/app/types";
import { motion } from "framer-motion";
import useGameStore from "../../store/gameStore";
import { useColorMixer } from "@/app/hooks/useColorMixer";
import { CircularSlider } from "./CircularSlider";
import { ColorDisplay } from "./ColorDisplay";
import { SubmitButton } from "./SubmitButton";
import { CharacterState } from "@/app/types";

interface ColorMixerProps {
  size?: number;
  currentColor: RGB;
  setCurrentColor: React.Dispatch<React.SetStateAction<RGB>>;
  setCharacterState: React.Dispatch<React.SetStateAction<CharacterState>>;
}

const ColorMixer: React.FC<ColorMixerProps> = React.memo(
  ({ size = 400, currentColor, setCurrentColor, setCharacterState }) => {
    const setActiveChannel = useGameStore((state) => state.setActiveChannel);
    const { isSubmitting, handleSubmitGuess } = useColorMixer();

    const handleColorChange = (color: keyof RGB, value: number): void => {
      setCurrentColor((prev) => ({
        ...prev,
        [color]: value,
      }));
    };

    const handleReset = (): void => {
      setCurrentColor({ r: 0, g: 0, b: 0 });
    };

    // Memoize the slider colors
    const sliderColors = useMemo(
      () => ({
        r: `rgb(${currentColor.r}, 0, 0)`,
        g: `rgb(0, ${currentColor.g}, 0)`,
        b: `rgb(0, 0, ${currentColor.b})`,
      }),
      [currentColor.r, currentColor.g, currentColor.b]
    );

    const handleSubmit = () => {
      handleSubmitGuess(currentColor, setCurrentColor, setCharacterState);
    };

    return (
      <div className="w-full h-full flex flex-col gap-0 items-center justify-center bg-transparent pb-20">
        <div className="relative">
          <motion.svg
            style={{ border: "none", outline: "none" }}
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
          >
            <ColorDisplay
              size={size}
              currentColor={currentColor}
              onReset={handleReset}
            />

            {(["r", "g", "b"] as const).map((channel, index) => (
              <CircularSlider
                key={channel}
                value={currentColor[channel]}
                onChange={(value) => handleColorChange(channel, value)}
                color={sliderColors[channel]}
                radius={size / (2.15 + index * 0.20)}
                size={size}
                channel={channel}
                setActiveChannel={setActiveChannel}
              />
            ))}
          </motion.svg>
        </div>

        <SubmitButton
          size={size}
          isSubmitting={isSubmitting}
          currentColor={currentColor}
          onSubmit={handleSubmit}
        />
      </div>
    );
  }
);

ColorMixer.displayName = "ColorMixer";

export default ColorMixer;
