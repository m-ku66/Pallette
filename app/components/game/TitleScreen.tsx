"use client";
import React, { useState, useEffect } from "react";
import useGameStore from "../../store/gameStore";
import TitleContent from "../ui/TitleContent";
import ModalContent from "../ui/ModalContent";
import { titleStates } from "../../types";
import CutScene from "./CutScene";

const TitleScreen = () => {
  const { startGame } = useGameStore();
  const [componentState, setComponentState] = useState<titleStates>("initial");
  const [modal, setModal] = useState(false);

  // Open modal on key press or click
  useEffect(() => {
    const screen = document.getElementById("screen");
    if (!screen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event) {
        setModal(true);
      }
    };
    const handleClick = (event: MouseEvent) => {
      setModal(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    screen.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      screen.removeEventListener("click", handleClick);
    };
  }, []);

  const contentRenderer = () => {
    switch (componentState) {
      case "initial":
        return (
          <div
            id="screen"
            className="w-full h-full flex flex-col items-center justify-center"
          >
            <TitleContent />
          </div>
        );
      case "cutscene":
        return <CutScene />;
      default:
        return null;
    }
  };

  const renderModal = () => {
    return (
      modal &&
      componentState === "initial" && (
        <ModalContent
          setComponentState={setComponentState}
          startGame={startGame}
          modal={modal}
          setModal={setModal}
        />
      )
    );
  };

  return (
    <>
      <div className="container max-w-full h-screen flex items-center relative justify-center">
        {renderModal()}
        {contentRenderer()}
      </div>
    </>
  );
};

export default TitleScreen;
