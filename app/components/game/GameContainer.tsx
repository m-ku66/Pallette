"use client";
import React, { useEffect, useState } from "react";
import SvgDeco from "../ui/SvgDeco";
import Menu from "../ui/Menu";
import AudioController from "../ui/AudioController";
import ColorMixer from "./ColorMixer";
import Timer from "./Timer";
import RGBVisualizer from "./RGBVisualizer";
import useGameStore from "../../store/gameStore";
import { motion } from "framer-motion";
import Character from "./Character";
import { CharacterState } from "../../types/index";
import { RGB } from "../../types/index";

const GameContainer = () => {
  const { gameState, generateTargetColor, submissionFlag } = useGameStore();
  const [currentColor, setCurrentColor] = useState<RGB>({
    r: 0,
    g: 0,
    b: 0,
  });
  const [characterState, setCharacterState] = useState<CharacterState>({
    emotion: "neutral",
    state: "neutral",
  });

  useEffect(() => {
    if (gameState === "playing") {
      generateTargetColor();
    }
  }, [gameState]);

  if (gameState === "title") return null;

  return (
    <div className="overflow-hidden container max-w-full h-screen flex justify-center items-center relative px-8 pt-4 pb-8 bg-white text-neutral-900">
      <Character
        targetColor={useGameStore.getState().targetColor}
        characterState={characterState}
        setCharacterState={setCharacterState}
      />
      <div className="w-[30%] h-full flex flex-col items-start justify-between">
        {/* Timer */}
        {submissionFlag ? (
          <span className="text-transparent">Timer</span>
        ) : (
          <Timer active />
        )}
        <SvgDeco direction="left" score={false} />
      </div>

      <div className="w-[40%] h-full flex flex-col items-center justify-center relative">
        <ColorMixer
          size={500}
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
          setCharacterState={setCharacterState}
        />
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-0"
        >
          <AudioController />
        </motion.div>
      </div>

      <div className="w-[30%] h-full flex flex-col items-end justify-between">
        <Menu />
        <RGBVisualizer currentColor={currentColor} />
        <SvgDeco direction="right" score={true} fontSize={4} />
      </div>
    </div>
  );
};

export default GameContainer;
