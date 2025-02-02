import { create } from "zustand";
import { RGB, GameStore } from "../types";

interface GameActions {
  startGame: () => void;
  endGame: () => void;
  resumeGame: () => void;
  updateCurrentColor: (color: RGB) => void;
  generateTargetColor: () => void;
  updateScore: (points: number) => void;
  updateTimeLeft: (time: number) => void;
  updateDifficulty: (level: number) => void;
  updateStreak: (streak: number) => void;
  setActiveChannel: (channel: keyof RGB | null) => void;
  resetGame: () => void;
  startNewRound: () => void;
  increaseDifficulty: () => void;
  updateWinStreak: (amount: number) => void;
  updateLosingStreak: (amount: number) => void;
  updateLatestAccuracy: (accuracy: string) => void;
  updateSubmissionFlag: (flag: boolean) => void;
  setIsPaused: (flag: boolean) => void;
}

const useGameStore = create<GameStore & GameActions>((set) => ({
  // Initial state
  score: 0,
  timeLeft: 40,
  currentColor: { r: 0, g: 0, b: 0 },
  targetColor: { r: 0, g: 0, b: 0 },
  gameState: "title",
  difficulty: 0,
  streak: 0,
  activeChannel: null,
  winStreak: 0,
  maxDifficulty: 5,
  losingStreak: 0,
  latestAccuracy: " ",
  submissionFlag: false,
  isPaused: false,

  // Actions
  startGame: () =>
    set(() => ({
      gameState: "playing",
      score: 0,
      timeLeft: 40,
      difficulty: 0,
      streak: 0,
      activeChannel: null,
      winStreak: 0,
      losingStreak: 0,
    })),

  endGame: () => set(() => ({ gameState: "gameOver" })),

  resumeGame: () => set(() => ({ gameState: "playing" })),

  updateCurrentColor: (color) =>
    set((state) => ({
      currentColor: { ...state.currentColor, ...color },
    })),

  updateWinStreak: (amount: number) =>
    set((state) => ({ winStreak: state.winStreak + amount })),

  updateLosingStreak: (amount: number) =>
    set((state) => ({ losingStreak: state.losingStreak + amount })),

  increaseDifficulty: () =>
    set((state) => ({
      difficulty: Math.min(state.difficulty + 1, state.maxDifficulty),
    })),

  generateTargetColor: () =>
    set((state) => {
      // Base randomization
      const baseColor = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
      };

      // As difficulty increases, make colors more varied
      if (state.difficulty > 1) {
        // Ensure at least one channel has a value below 100 or above 200
        const channel = Math.floor(Math.random() * 3);
        const channels: (keyof RGB)[] = ["r", "g", "b"];

        baseColor[channels[channel]] =
          Math.random() > 0.5
            ? Math.floor(Math.random() * 100) // Dark value
            : Math.floor(Math.random() * 55) + 200; // Bright value
      }

      return { targetColor: baseColor };
    }),

  updateSubmissionFlag: (flag) => set(() => ({ submissionFlag: flag })),

  setIsPaused: (flag) => set(() => ({ isPaused: flag })),

  updateScore: (points) => set((state) => ({ score: state.score + points })),

  updateTimeLeft: (time) => set(() => ({ timeLeft: time })),

  updateDifficulty: (level) => set(() => ({ difficulty: level })),

  updateStreak: (streak) => set(() => ({ streak })),

  setActiveChannel: (channel: keyof RGB | null) =>
    set(() => ({ activeChannel: channel })),

  updateLatestAccuracy: (accuracy) => set(() => ({ latestAccuracy: accuracy })),

  resetGame: () =>
    set(() => ({
      score: 0,
      timeLeft: 40,
      currentColor: { r: 0, g: 0, b: 0 },
      targetColor: { r: 0, g: 0, b: 0 },
      gameState: "title",
      difficulty: 0,
      streak: 0,
      activeChannel: null,
      winStreak: 0,
      losingStreak: 0,
      latestAccuracy: " ",
      submissionFlag: false,
      isPaused: false,
    })),

  startNewRound: () =>
    set((state) => {
      const newTimeLimit = Math.max(30, 40 - state.difficulty * 4); // Reduces time as difficulty increases
      return {
        currentColor: { r: 0, g: 0, b: 0 },
        timeLeft: newTimeLimit,
        targetColor: {
          r: Math.floor(Math.random() * 256 - state.difficulty * 10),
          g: Math.floor(Math.random() * 256 - state.difficulty * 10),
          b: Math.floor(Math.random() * 256) - state.difficulty * 10,
        },
      };
    }),
}));

export default useGameStore;
