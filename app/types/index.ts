export interface RGB {
  r: number;
  g: number;
  b: number;
}

export type GameState = "title" | "playing" | "paused" | "gameOver";

export interface GameStore {
  score: number;
  timeLeft: number;
  currentColor: RGB;
  targetColor: RGB;
  gameState: GameState;
  difficulty: number;
  streak: number;
  activeChannel: keyof RGB | null;
}
