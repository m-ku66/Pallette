"use client";
import GameContainer from "./components/game/GameContainer";
import TitleScreen from "./components/game/TitleScreen";
import TransitionScreen from "./components/game/TransitionScreen";
import useGameStore from "./store/gameStore";
import React, { useEffect, useState } from "react";
import { TRANSITION_DURATION } from "./types";
import { useIsFirstRender } from "./hooks/useIsFirstRender";
import PauseOverlay from "./components/ui/PauseScreen";
import BufferPage from "./components/ui/BufferPage";

export default function Home() {
  const {
    gameState,
    initializeGame,
    latestAccuracy,
    streak,
    losingStreak,
    isPaused,
  } = useGameStore();
  const [transitioning, setTransitioning] = useState(false);
  const isFirstRender = useIsFirstRender();
  const [isWaiting, setIsWaiting] = useState(isFirstRender ? true : false);

  // useEffect to initialize the game state
  useEffect(() => {
    initializeGame();
  }, []);

  // useEffect to handle transitions between rounds in the playing state of the game
  useEffect(() => {
    if (!isFirstRender) {
      setTransitioning(true);

      const timer = setTimeout(() => {
        setTransitioning(false);
      }, TRANSITION_DURATION * 3.5); // length of transition screen

      return () => clearTimeout(timer);
    }
  }, [streak, losingStreak]);

  /**
   *
   * @param state game state
   * @returns component to render based on the current game state
   */
  const renderScreen = (state: string) => {
    switch (state) {
      case "title":
        return <TitleScreen />;
      case "playing":
        // transition component is scoped to cover the game container only
        return (
          <div className="container max-w-full h-screen relative">
            {transitioning && <TransitionScreen accuracy={latestAccuracy} />}
            <GameContainer />
          </div>
        );
      default:
        return <TitleScreen />;
    }
  };

  /**
   * The reasoning for this is complicated. Basically browsers
   * prvent autoplay of audio and video elements on the first page load
   * so the title music won't play unless the user interacts with the page
   * hence the buffer screen
   * @returns component to render while waiting for the game to load
   */
  const renderBuffer = () => {
    return <BufferPage setIsWaiting={setIsWaiting} />;
  };

  return (
    <div className="w-screen h-screen relative">
      {isPaused && <PauseOverlay />}
      {isWaiting ? renderBuffer() : renderScreen(gameState)}
    </div>
  );
}
