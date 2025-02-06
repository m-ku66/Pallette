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
    increaseDifficulty,
    score,
    losingStreak,
    updateLosingStreak,
    updateLatestAccuracy,
    endGame,
    updateHighScoreInfo,
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
    const perfectThreshold = Math.min(95, 85 + difficulty * 1); // Starts at 85%, gradually reaches 95%
    const goodThreshold = Math.min(85, 75 + difficulty * 1); // Starts at 75%, gradually reaches 85%

    if (accuracy >= perfectThreshold) {
      // "Perfect" guess
      updateStreak(streak + 1);
      updateLatestAccuracy("Perfect!");

      // Increase difficulty every 5 perfect guesses
      if (streak != 0 && streak % 3 === 0) {
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
        updateHighScoreInfo(score, streak);
        endGame();
      }, TRANSITION_DURATION * 3);
    }
  };

  return {
    isSubmitting,
    handleSubmitGuess,
  };
};
