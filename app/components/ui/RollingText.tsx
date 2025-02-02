import React from "react";
import useGameStore from "@/app/store/gameStore";
import { motion } from "framer-motion";

type Props = {
  text: string;
  duration: number;
  delay: number;
};

const RollingText = ({ text, duration, delay }: Props) => {
  const { isPaused, setIsPaused, resetGame, updateDifficulty } = useGameStore();

  const itemFunction = () => {
    switch (text) {
      case "PORTFOLIO":
        return () => window.open("https://marcmiango.vercel.app/");
      case "GITHUB":
        return () => window.open("https://github.com/m-ku66");
      case "TITLE":
        return () => {
          resetGame();
          updateDifficulty(0);
          location.reload();
        };
      case "RESUME":
        return () => setIsPaused(isPaused ? false : true);
      default:
        return () => {};
    }
  };

  return (
    <div
      onClick={itemFunction()}
      className="nico opacity-50 hover:opacity-100 duration-150 active:opacity-100"
    >
      {text}
    </div>
  );
};

export default RollingText;
