"use client";
import GameContainer from "./components/game/GameContainer";
import TitleScreen from "./components/game/TitleScreen";
import useGameStore from "./store/gameStore";

export default function Home() {
  const { gameState } = useGameStore();

  const renderScreen = (state: string) => {
    switch (state) {
      case "title":
        return <TitleScreen />;
      case "playing":
        return <GameContainer />;
      default:
        return <TitleScreen />;
    }
  };

  return renderScreen(gameState);
}
