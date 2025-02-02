import { useState } from "react";
import { RGB } from "@/app/types";
import useGameStore from "../store/gameStore";
import calculateColorDifference from "../components/game/ColorCalculator";
import { CharacterState } from "@/app/types";
import { TRANSITION_DURATION } from "@/app/types";

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
    updateLatestAccuracy,
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

    // Calculate accuracy of guess
    const diff = calculateColorDifference(targetColor, currentColor);
    const maxDiff = Math.sqrt(Math.pow(255, 2) * 3);
    const accuracy = 100 - (diff / maxDiff) * 100;

    // Thresholds for different accuracy levels
    const perfectThreshold = 95 - difficulty * 2;
    const goodThreshold = 85 - difficulty * 2;

    if (accuracy >= perfectThreshold) {
      // "Perfect" guess
      updateStreak(streak + 1);
      updateWinStreak(1);
      updateLatestAccuracy("Perfect!");

      // Increase difficulty every 3rd win streak
      if (winStreak > 0 && winStreak % 3 === 0) {
        increaseDifficulty();
      }

      setTimeout(() => {
        updateScore(10 + Math.floor(accuracy - perfectThreshold));
      }, TRANSITION_DURATION * 3);

      setTimeout(() => {
        setCharacterState((prev) => ({
          ...prev,
          emotion: "surprised",
          state: "victory",
        }));
      }, TRANSITION_DURATION);
    } else if (accuracy >= goodThreshold) {
      // Good guess
      updateStreak(streak + 1);
      updateWinStreak(1);
      updateLatestAccuracy("Good!");

      setTimeout(() => {
        updateScore(5);
      }, TRANSITION_DURATION * 3);

      if (winStreak > 0 && winStreak % 5 === 0) {
        increaseDifficulty();
      }

      setTimeout(() => {
        setCharacterState((prev) => ({
          ...prev,
          emotion: "happy",
          state: "victory",
        }));
      }, TRANSITION_DURATION);
    } else {
      // Incorrect guess
      updateStreak(0);
      updateWinStreak(winStreak - winStreak);
      updateLosingStreak(1);
      // updateDifficulty(0);
      updateLatestAccuracy("Missed...");

      setTimeout(() => {
        updateScore(score === 0 ? 0 : -1);
      }, TRANSITION_DURATION * 3);

      setTimeout(() => {
        setCharacterState((prev) => ({
          ...prev,
          emotion: "disappointed",
          state: "defeat",
        }));
      }, TRANSITION_DURATION);
    }

    // Reset character state
    setTimeout(() => {
      setCharacterState((prev) => ({
        ...prev,
        emotion: "neutral",
        state: "neutral",
      }));
    }, TRANSITION_DURATION * 4);

    // Transition to next round
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentColor({ r: 0, g: 0, b: 0 });
      startNewRound();
    }, TRANSITION_DURATION * 2);

    // Reset game if losing streak reaches 3
    if (losingStreak === 3) {
      setTimeout(() => {
        resetGame();
        updateDifficulty(0);
        location.reload();
      }, TRANSITION_DURATION * 3);
    }
  };

  return {
    isSubmitting,
    handleSubmitGuess,
  };
};
