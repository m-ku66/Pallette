import { create } from "zustand";
import { RGB, GameStore } from "../types";

interface GameActions {
  initializeGame: () => void;
  startGame: () => void;
  endGame: () => void;
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
  updateLosingStreak: (amount: number) => void;
  updateLatestAccuracy: (accuracy: string) => void;
  updateSubmissionFlag: (flag: boolean) => void;
  setIsPaused: (flag: boolean) => void;
  startCutscene: () => void;
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
  maxDifficulty: 5,
  losingStreak: 0,
  latestAccuracy: " ",
  submissionFlag: false,
  isPaused: false,

  // Actions

  initializeGame: () => set(() => ({ gameState: "title" })),
  startGame: () =>
    set(() => ({
      gameState: "playing",
      score: 0,
      timeLeft: 40,
      difficulty: 0,
      streak: 0,
      activeChannel: null,
      losingStreak: 0,
    })),

  startCutscene: () =>
    set(() => ({
      gameState: "cutscene",
    })),

  endGame: () => set(() => ({ gameState: "gameOver" })),

  updateCurrentColor: (color) =>
    set((state) => ({
      currentColor: { ...state.currentColor, ...color },
    })),

  updateLosingStreak: (amount) => set(() => ({ losingStreak: amount })),

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
        // Number of channels to modify increases with difficulty
        const channelsToModify = Math.min(Math.ceil(state.difficulty / 2), 3);
        const channels: (keyof RGB)[] = ["r", "g", "b"];

        // Shuffle channels array to randomize which ones get modified
        const shuffledChannels = [...channels].sort(() => Math.random() - 0.5);

        // Modify multiple channels based on difficulty
        for (let i = 0; i < channelsToModify; i++) {
          // As difficulty increases, make the dark values darker and bright values brighter
          const darkMax = Math.max(10, 100 - state.difficulty * 15); // Gets darker with difficulty
          const brightMin = Math.min(255, 200 + state.difficulty * 10); // Gets brighter with difficulty

          baseColor[shuffledChannels[i]] =
            Math.random() > 0.5
              ? Math.floor(Math.random() * darkMax) // Dark value
              : Math.floor(Math.random() * (255 - brightMin)) + brightMin; // Bright value
        }
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
      losingStreak: 0,
      latestAccuracy: " ",
      submissionFlag: false,
      isPaused: false,
    })),

  startNewRound: () =>
    set((state) => {
      const newTimeLimit = Math.max(10, 40 - state.difficulty * 4); // Reduces time as difficulty increases
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
