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
    const perfectThreshold = 85 + difficulty * 2; // Starts at 85%, reaches 95% at max difficulty
    const goodThreshold = 75 + difficulty * 2; // Starts at 75%, reaches 85% at max difficulty

    if (accuracy >= perfectThreshold) {
      // "Perfect" guess
      updateStreak(streak + 1);
      updateLatestAccuracy("Perfect!");

      // Increase difficulty every 5 perfect guesses
      if (streak != 0 && streak % 5 === 0) {
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
      updateLatestAccuracy("Good!");

      setTimeout(() => {
        updateScore(5);
      }, TRANSITION_DURATION * 3);

      // Increase difficulty every 5 good guesses
      if (streak != 0 && streak % 5 === 0) {
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
      updateLosingStreak(losingStreak + 1);
      updateLatestAccuracy("Missed...");

      setTimeout(() => {
        updateScore(score === 0 ? 0 : -1 * (difficulty * 2));
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
    if (losingStreak >= 2) {
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
