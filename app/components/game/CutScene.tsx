import React, { useState } from "react";
import { motion } from "framer-motion";
import cutsceneText from "@/app/resources/cutsceneText";
import { CutsceneTextObject } from "@/app/types";
import UIContainer from "./cutscene_parts/UIContainer";
import ModalContent from "../ui/ModalContent";
import { titleStates } from "@/app/types";
import useGameStore from "@/app/store/gameStore";
import Image from "next/image";
import { useImagePreloader } from "@/app/hooks/useImagePreloader";

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
        className="w-full h-full object-contain"
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
  const [UIState, setUIState] = useState<boolean | null>(true);
  const { startGame } = useGameStore();

  // Get total number of images from your textObject
  const totalImages = Object.keys(textObject).length - 1;

  // Create array of image paths
  const imagePaths = Array.from(
    { length: totalImages },
    (_, i) => `/images/${i + 1}.png`
  );

  // Use our preloader hook
  const { imagesPreloaded } = useImagePreloader(imagePaths);

  // Don't render anything until images are loaded
  if (!imagesPreloaded) {
    return (
      <div className="container max-w-full h-screen relative flex justify-center items-center text-white bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl"
        >
          Loading your story...
        </motion.div>
      </div>
    );
  }

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
      <motion.div
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 1, delay: 1 }}
      >
        <ImageContainer sceneNumber={currentSlide} />
      </motion.div>
      <SceneHolder />
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/[0.95] via-black/[0.8]  to-black/transparent h-[20%]"></div>
      <div
        onClick={() => setUIState(UIState === false ? true : true)}
        className={`absolute w-full h-full ${
          UIState ? "opacity-100" : "opacity-0"
        }`}
      >
        <UIContainer
          textInput={textObject}
          sceneNumber={currentSlide}
          setCurrentSlide={setCurrentSlide}
          setModal={setModal}
          setUIState={setUIState}
        />
      </div>
    </div>
  );
};

export default CutScene;
