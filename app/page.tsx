"use client";
import GameContainer from "./components/game/GameContainer";
import TitleScreen from "./components/game/TitleScreen";
import TransitionScreen from "./components/game/TransitionScreen";
import useGameStore from "./store/gameStore";
import React, { useEffect, useState } from "react";
import { TRANSITION_DURATION } from "./types";
import { useIsFirstRender } from "./hooks/useIsFirstRender";
import PauseOverlay from "./components/ui/PauseScreen";

export default function Home() {
  const { gameState, latestAccuracy, streak, losingStreak, isPaused } =
    useGameStore();
  const [transitioning, setTransitioning] = useState(false);
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    if (!isFirstRender) {
      setTransitioning(true);

      const timer = setTimeout(() => {
        setTransitioning(false);
      }, TRANSITION_DURATION * 3.5); // length of transition screen

      return () => clearTimeout(timer);
    }
  }, [streak, losingStreak]);

  const renderScreen = (state: string) => {
    switch (state) {
      case "title":
        return <TitleScreen />;
      case "playing":
        // transition component is scoped to cover the game container only
        return (
          <div className="w-screen h-screen relative">
            {transitioning && <TransitionScreen accuracy={latestAccuracy} />}
            <GameContainer />
          </div>
        );
      default:
        return <TitleScreen />;
    }
  };

  return (
    <div className="w-screen h-screen relative">
      {isPaused && <PauseOverlay />}
      {renderScreen(gameState)}
    </div>
  );
}
