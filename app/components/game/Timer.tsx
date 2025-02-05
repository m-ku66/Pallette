import React, { useEffect, useState, useRef } from "react";
import Progress from "../ui/Progress";
import useGameStore from "../../store/gameStore";
import { motion } from "framer-motion";

type Props = {
  active?: boolean;
};

const Timer = ({ active }: Props) => {
  const { timeLeft, updateTimeLeft, gameState, endGame, isPaused } =
    useGameStore();
  const [milliseconds, setMilliseconds] = useState(0);

  const snapshotTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let msTimer: NodeJS.Timeout;

    if (!isPaused && timeLeft > 0) {
      // If we have a snapshot, restore it
      if (snapshotTimeRef.current !== null) {
        updateTimeLeft(snapshotTimeRef.current);
        snapshotTimeRef.current = null;
      }

      timer = setInterval(() => updateTimeLeft(timeLeft - 1), 1000);
      msTimer = setInterval(() => {
        setMilliseconds((prev) => (prev > 0 ? prev - 1 : 9));
      }, 100);
    } else if (isPaused) {
      // Save current time when pausing
      snapshotTimeRef.current = timeLeft;
    } else if (timeLeft === 0 && gameState === "playing") {
      setMilliseconds(0);
      setTimeout(() => {
        endGame();
      }, 1500);
    }

    return () => {
      clearInterval(timer);
      clearInterval(msTimer);
    };
  }, [timeLeft, gameState, isPaused]);

  const formattedTime = (
    <span className="nico text-[2rem] flex items-baseline">
      {timeLeft.toString().padStart(2, "0")}
      <span className="text-[1.2rem]">.{milliseconds}s</span>
    </span>
  );

  return (
    <motion.div
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      className="w-fit max-w-xs select-none"
    >
      <div
        className={`flex justify-between mb-2 ${
          timeLeft < 6
            ? "text-[#ff0000] animate-ping"
            : timeLeft < 1
            ? "text-[#ff0000]"
            : ""
        }`}
      >
        {formattedTime}
      </div>
      <Progress
        value={(timeLeft / 40) * 100}
        color={timeLeft < 11 ? "red" : "rgba(0, 0, 0, 0.5)"}
      />
    </motion.div>
  );
};

export default Timer;
