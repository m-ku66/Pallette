import React, { useEffect, useState } from "react";
import Progress from "../ui/Progress";
import useGameStore from "../../store/gameStore";

const Timer = () => {
  const { timeLeft, updateTimeLeft, gameState, endGame, resetGame } =
    useGameStore();
  const [milliseconds, setMilliseconds] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let msTimer: NodeJS.Timeout;

    if (gameState === "playing" && timeLeft > 0) {
      // Main second timer
      timer = setInterval(() => {
        updateTimeLeft(timeLeft - 1);
        setMilliseconds(9); // Reset milliseconds when second changes
      }, 1000);

      // Millisecond timer
      msTimer = setInterval(() => {
        setMilliseconds((prev) => (prev > 0 ? prev - 1 : 9));
      }, 100);
    } else if (timeLeft === 0 && gameState === "playing") {
      setMilliseconds(0);
      setTimeout(() => {
        resetGame();
        endGame();
      }, 1000);
    }

    return () => {
      clearInterval(timer);
      clearInterval(msTimer);
    };
  }, [timeLeft, gameState]);

  const formattedTime = (
    <span className="nico text-[2rem] flex items-baseline">
      {timeLeft.toString().padStart(2, "0")}
      <span className="text-[1.2rem]">.{milliseconds}s</span>
    </span>
  );

  return (
    <div className="w-fit max-w-xs select-none">
      <div className="flex justify-between mb-2">{formattedTime}</div>
      <Progress value={(timeLeft / 30) * 100} color="rgba(0, 0, 0, 0.5)" />
    </div>
  );
};

export default Timer;
