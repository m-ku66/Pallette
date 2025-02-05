import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import cutsceneText from "@/app/resources/cutsceneText";
import { CutsceneTextObject } from "@/app/types";
import UIContainer from "./cutscene_parts/UIContainer";

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
      className="w-full h-full flex justify-center items-center"
    >
      <img src={src} alt={`Image ${src}`} className="w-full h-full object-" />
    </motion.div>
  );
};
// MAIN CUTSCENE COMPONENT***********************************************************************
const CutScene = () => {
  const textObject = cutsceneText as CutsceneTextObject;
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <div className="container max-w-full h-screen relative flex justify-center items-center text-white bg-black">
      <ImageContainer sceneNumber={currentSlide} />
      <SceneHolder />
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/[0.9] via-black/[0.7]  to-black/transparent h-[20%]"></div>
      <UIContainer
        textInput={textObject}
        sceneNumber={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
    </div>
  );
};

export default CutScene;
