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
  highScoreInfo: {
    highScore: number;
    streak: number;
  };
}

export interface CharacterState {
  emotion: "neutral" | "surprised" | "disappointed" | "happy";
  state: "neutral" | "victory" | "defeat";
}

export const TRANSITION_DURATION = 1100;

export type titleStates = "initial" | "cutscene" | "playing";

export type CutsceneTextObject = {
  speaker: string;
  slide_1: {
    line_1: string;
    line_2: string;
    line_3: string;
  };
  slide_2: {};
  slide_3: {};
};
