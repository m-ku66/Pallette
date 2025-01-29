import { useState } from "react";
import { RGB } from "@/app/types";
import useGameStore from "../store/gameStore";
import calculateColorDifference from "../components/game/ColorCalculator";
import { CharacterState } from "@/app/types";

export const useColorMixer = () => {
  const {
    targetColor,
    difficulty,
    updateScore,
    updateStreak,
    streak,
    startNewRound,
    resetGame,
    winStreak,
    updateWinStreak,
    increaseDifficulty,
    updateDifficulty,
    score,
    losingStreak,
    updateLosingStreak,
  } = useGameStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitGuess = (
    currentColor: RGB,
    setCurrentColor: (color: RGB) => void,
    setCharacterState: (
      state: CharacterState | ((prev: CharacterState) => CharacterState)
    ) => void
  ) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const diff = calculateColorDifference(targetColor, currentColor);
    const maxDiff = Math.sqrt(Math.pow(255, 2) * 3);
    const accuracy = 100 - (diff / maxDiff) * 100;

    const perfectThreshold = 95 - difficulty * 2;
    const goodThreshold = 85 - difficulty * 2;

    if (accuracy >= perfectThreshold) {
      updateScore(10 + Math.floor(accuracy - perfectThreshold));
      updateStreak(streak + 1);
      updateWinStreak(1);

      if (winStreak > 0 && winStreak % 3 === 0) {
        increaseDifficulty();
      }

      setCharacterState((prev) => ({
        ...prev,
        emotion: "surprised",
        state: "victory",
      }));
    } else if (accuracy >= goodThreshold) {
      updateScore(5);
      updateStreak(streak + 1);
      updateWinStreak(1);

      if (winStreak > 0 && winStreak % 5 === 0) {
        increaseDifficulty();
      }

      setCharacterState((prev) => ({
        ...prev,
        emotion: "happy",
        state: "victory",
      }));
    } else {
      updateStreak(0);
      updateWinStreak(winStreak - winStreak);
      updateScore(score === 0 ? 0 : -1);
      updateLosingStreak(1);
      updateDifficulty(0);
      setCharacterState((prev) => ({
        ...prev,
        emotion: "disappointed",
        state: "defeat",
      }));
    }

    setCurrentColor({ r: 0, g: 0, b: 0 });

    setTimeout(() => {
      setIsSubmitting(false);
      setCharacterState((prev) => ({
        ...prev,
        state: "neutral",
        emotion: "neutral",
      }));
      startNewRound();

      if (losingStreak === 3) {
        resetGame();
        updateDifficulty(0);
        location.reload();
      }
    }, 1000);
  };

  return {
    isSubmitting,
    handleSubmitGuess,
  };
};
