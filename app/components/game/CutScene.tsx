import React, { useState } from "react";
import { motion } from "framer-motion";
import cutsceneText from "@/app/resources/cutsceneText";
import { CutsceneTextObject } from "@/app/types";
import UIContainer from "./cutscene_parts/UIContainer";
import ModalContent from "../ui/ModalContent";
import { titleStates } from "@/app/types";
import useGameStore from "@/app/store/gameStore";
import Image from "next/image";

// SCENE HOLDER COMPONENT***********************************************************************
const SceneHolder = () => {
  return (
    <div className="z-[10] absolute w-full h-full flex flex-col justify-between items-center pointer-events-none">
      <motion.div
        initial={{ height: "50%" }}
        animate={{ height: "5%" }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.87, 0, 0.13, 1] }}
        className="bg-black w-full origin-top"
      />
      <motion.div
        initial={{ height: "50%" }}
        animate={{ height: "5%" }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.87, 0, 0.13, 1] }}
        className="bg-black w-full origin-bottom"
      />
    </div>
  );
};
// IMAGE CONTAINER COMPONENT***********************************************************************
const ImageContainer = ({ sceneNumber }: { sceneNumber: number }) => {
  const src = `/images/${sceneNumber}.png`;
  return (
    <motion.div
      key={sceneNumber + src}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{ opacity: 1, x: [0, -1, 1], y: [0, -1, 1] }}
      transition={{
        opacity: { duration: 0.8, delay: 0.1, ease: [0.87, 0, 0.13, 1] },
        x: {
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        },
        y: {
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        },
      }}
      className="w-full h-full flex justify-center items-center select-none"
    >
      <Image
        src={src}
        alt={`Image ${src}`}
        width={5000}
        height={5000}
        className="w-full h-full object-fill"
      />
    </motion.div>
  );
};
// MAIN CUTSCENE COMPONENT***********************************************************************
const CutScene = () => {
  const textObject = cutsceneText as CutsceneTextObject;
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [componentState, setComponentState] = useState<titleStates>("playing");
  const [modal, setModal] = useState(false);
  const { startGame } = useGameStore();

  const renderModal = () => {
    return (
      modal &&
      componentState === "playing" && (
        <ModalContent
          key={componentState}
          setComponentState={setComponentState}
          startGame={startGame}
          modal={modal}
          setModal={setModal}
          state={componentState}
        />
      )
    );
  };

  // console.log(componentState);

  return (
    <div className="container max-w-full h-screen relative flex justify-center items-center text-white bg-black">
      {renderModal()}
      <ImageContainer sceneNumber={currentSlide} />
      <SceneHolder />
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/[0.95] via-black/[0.8]  to-black/transparent h-[20%]"></div>
      <UIContainer
        textInput={textObject}
        sceneNumber={currentSlide}
        setCurrentSlide={setCurrentSlide}
        setModal={setModal}
      />
    </div>
  );
};

export default CutScene;
