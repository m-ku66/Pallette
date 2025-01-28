import { create } from "zustand";
import { RGB, GameStore } from "../types";

interface GameActions {
  startGame: () => void;
  endGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  updateCurrentColor: (color: RGB) => void;
  generateTargetColor: () => void;
  updateScore: (points: number) => void;
  updateTimeLeft: (time: number) => void;
  updateDifficulty: (level: number) => void;
  updateStreak: (streak: number) => void;
  setActiveChannel: (channel: keyof RGB | null) => void;
  resetGame: () => void;
}

const useGameStore = create<GameStore & GameActions>((set) => ({
  // Initial state
  score: 0,
  timeLeft: 30,
  currentColor: { r: 0, g: 0, b: 0 },
  targetColor: { r: 0, g: 0, b: 0 },
  gameState: "title",
  difficulty: 1,
  streak: 0,
  activeChannel: null,

  // Actions
  startGame: () =>
    set(() => ({
      gameState: "playing",
      score: 0,
      timeLeft: 30,
      difficulty: 1,
      streak: 0,
    })),

  endGame: () => set(() => ({ gameState: "gameOver" })),

  pauseGame: () => set(() => ({ gameState: "paused" })),

  resumeGame: () => set(() => ({ gameState: "playing" })),

  // updateCurrentColor: (color) => set(() => ({ currentColor: color })),
  updateCurrentColor: (color) =>
    set((state) => ({
      currentColor: { ...state.currentColor, ...color },
    })),

  generateTargetColor: () =>
    set(() => ({
      targetColor: {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
      },
    })),

  updateScore: (points) => set((state) => ({ score: state.score + points })),

  updateTimeLeft: (time) => set(() => ({ timeLeft: time })),

  updateDifficulty: (level) => set(() => ({ difficulty: level })),

  updateStreak: (streak) => set(() => ({ streak })),

  setActiveChannel: (channel: keyof RGB | null) =>
    set(() => ({ activeChannel: channel })),

  resetGame: () =>
    set(() => ({
      score: 0,
      timeLeft: 30,
      currentColor: { r: 0, g: 0, b: 0 },
      targetColor: { r: 0, g: 0, b: 0 },
      gameState: "title",
      difficulty: 1,
      streak: 0,
    })),
}));

export default useGameStore;
