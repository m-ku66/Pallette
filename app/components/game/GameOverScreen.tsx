import React from "react";
import useGameStore from "@/app/store/gameStore";
import AudioController from "../ui/AudioController";
import { motion } from "framer-motion";

const GameOverScreen = () => {
  const { highScoreInfo, resetGame, startGame } = useGameStore();

  const renderText = () => {
    const score = highScoreInfo.highScore;
    const streak = highScoreInfo.streak;
    let part1;
    let part2;

    // based on score
    if (score < 100) {
      part1 = `Chroma is disappointed...`;
    } else if (score >= 100 && score < 200) {
      part1 = `Hrm...${score} points is not bad at all...`;
    } else if (score >= 200 && score < 300) {
      part1 = `Well done! You scored fairly well!`;
    } else if (score >= 300 && score < 400) {
      part1 = `Great job! You're a great artificer!`;
    } else if (score >= 400) {
      part1 = `You're a genius!`;
    }

    // based on streak
    if (streak < 10) {
      part2 = `Maybe give it another try..?`;
    } else if (streak >= 10 && streak < 20) {
      part2 = `Let's do better next time!`;
    } else if (streak >= 20) {
      part2 = `Ready for another round?`;
    }

    return [part1, part2];
  };

  return (
    <motion.div
      initial={{ clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)" }}
      animate={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      }}
      transition={{
        duration: 1,
        ease: [0.87, 0, 0.13, 1],
        delay: 0.5,
      }}
      className="container max-w-full h-screen flex flex-col gap-16 justify-center items-center"
    >
      <div className="hidden">
        <AudioController />
      </div>
      <div className="select-none flex flex-col items-center gap-0">
        <motion.h1
          initial={{ clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)" }}
          animate={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          transition={{
            duration: 1,
            ease: [0.87, 0, 0.13, 1],
            delay: 1,
          }}
          className="nico text-[6rem]"
        >
          GAME OVER
        </motion.h1>
        <motion.p
          initial={{ clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)" }}
          animate={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          transition={{
            duration: 1,
            ease: [0.87, 0, 0.13, 1],
            delay: 1.5,
          }}
          className="montserrat text-[1.2rem] opacity-50 mb-8"
        >
          {renderText().join(" ")}
        </motion.p>
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="nico select-none text-[1rem] flex gap-8"
        >
          <p className="opacity-50 hover:opacity-100 duration-300">
            Highscore: {highScoreInfo.highScore}
          </p>
          <span className="opacity-50">|</span>
          <p className="opacity-50 hover:opacity-100 duration-300">
            Streak: {highScoreInfo.streak}
          </p>
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: [0, 1], scale: [0, 1] }}
        transition={{ duration: 0.5, ease: [0.87, 0, 0.13, 1], delay: 2 }}
        className="nico flex flex-col items-center gap-4 w-[30%]"
      >
        <motion.button
          initial={{ scale: 1, opacity: 0.5 }}
          whileHover={{ scale: 1.1, opacity: 1 }}
          whileTap={{ scale: 0.9, opacity: 0.8 }}
          onClick={() => location.reload()}
          className="bg-white text-neutral-900 rounded-lg px-4 py-2 w-[50%] drop-shadow-md outline outline-1 outline-neutral-400"
        >
          No thanks
        </motion.button>
        <motion.button
          initial={{ scale: 1, opacity: 0.5 }}
          whileHover={{ scale: 1.1, opacity: 1 }}
          whileTap={{ scale: 0.9, opacity: 0.8 }}
          onClick={() => resetGame()}
          className="bg-white text-neutral-900 rounded-lg px-4 py-2 w-[50%] drop-shadow-md outline outline-1 outline-neutral-400"
        >
          Sure
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default GameOverScreen;
