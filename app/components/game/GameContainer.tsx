"use client";
import React, { useEffect } from "react";
import SvgDeco from "../ui/SvgDeco";
import Menu from "../ui/Menu";
import AudioController from "../ui/AudioController";
import ColorMixer from "./ColorMixer";
import Timer from "./Timer";
import RGBVisualizer from "./RGBVisualizer";
import useGameStore from "../../store/gameStore";
import { motion } from "framer-motion";
import Character from "./Character";

const GameContainer = () => {
  const { gameState, generateTargetColor } = useGameStore();

  useEffect(() => {
    if (gameState === "playing") {
      generateTargetColor();
    }
  }, [gameState]);

  if (gameState === "title") return null;

  return (
    <div className="overflow-hidden container max-w-full h-screen flex justify-center items-center relative px-8 pt-4 pb-8 bg-white text-neutral-900">
      <Character targetColor={useGameStore.getState().targetColor} />
      <div className="w-[30%] h-full flex flex-col items-start justify-between">
        {/* Timer */}
        <Timer />
        <SvgDeco direction="left" score={false} />
      </div>

      <div className="w-[40%] h-full flex flex-col items-center justify-center relative">
        <ColorMixer size={500} />
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
        <RGBVisualizer />
        <SvgDeco direction="right" score={true} fontSize={4} />
      </div>
    </div>
  );
};

export default GameContainer;
