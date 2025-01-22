"use client";
import React from "react";
import SvgDeco from "../ui/SvgDeco";
import Menu from "../ui/Menu";
import AudioController from "../ui/AudioController";
import ColorMixer from "./ColorMixer";
import { motion } from "framer-motion";

const GameContainer = () => {
  return (
    <div className="container max-w-full h-screen flex justify-center items-center relative px-8 pt-4 pb-8 bg-white text-neutral-900">
      {/* Page Thirds Start ----------*/}
      <div className="w-[30%] h-full bg-yellow-500/[0.0] flex flex-col items-start justify-between">
        <p>Timer</p>
        <SvgDeco direction="left" score={false} />
      </div>
      <div className="w-[40%] h-full bg-red-500/[0.0] flex flex-col items-center justify-center relative">
        <ColorMixer size={500} />
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-0"
        >
          <AudioController />
        </motion.div>
      </div>
      <div className="w-[30%] h-full bg-blue-500/[0.0] flex flex-col items-end justify-between">
        <Menu />
        <p>interactive rgb channel viz component</p>
        <SvgDeco direction="right" score={true} fontSize={4} />
      </div>
      {/* Page Thirds End ----------*/}
    </div>
  );
};

export default GameContainer;

/**
 * Note:
 * The character component would most likely go outside of the
 * page thirds and be absolutely positined relative to the parent
 * container.
 */
