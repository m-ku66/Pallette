export interface RGB {
  r: number;
  g: number;
  b: number;
}

export type GameState = "title" | "cutscene" | "playing" | "gameOver";

export interface GameStore {
  score: number;
  timeLeft: number;
  currentColor: RGB;
  targetColor: RGB;
  gameState: GameState;
  difficulty: number;
  streak: number;
  activeChannel: keyof RGB | null;
  maxDifficulty: number;
  losingStreak: number;
  latestAccuracy: string;
  submissionFlag: boolean;
  isPaused: boolean;
}

export interface CharacterState {
  emotion: "neutral" | "surprised" | "disappointed" | "happy";
  state: "neutral" | "victory" | "defeat";
}

export const TRANSITION_DURATION = 1100;

export type titleStates = "initial" | "cutscene";
