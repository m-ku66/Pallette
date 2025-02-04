import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AudioController from "../ui/AudioController";
import cutsceneText from "@/app/resources/cutsceneText";
import { CutsceneTextObject } from "@/app/types";
import useGameStore from "@/app/store/gameStore";

/**
 * Components:
 * - Black bars on top and bottom(scene holder). Scenes are 16:9 aspect ratio (x)
 * - Text box, skip, return to title, music, and hide ui grouped as a ui container (x)
 * - Component to handle the rendering of text(animating the text in) (x)
 * - Image container (x)
 *
 * @returns User controlled cutscene in visual novel style
 */

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

// UI CONTAINER COMPONENT***********************************************************************
type UIContainerProps = {
  textInput: any;
  sceneNumber: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
};
const UIContainer = ({
  textInput,
  sceneNumber,
  setCurrentSlide,
}: UIContainerProps) => {
  const { startGame } = useGameStore();
  const keywords = [
    "absence of color",
    "The Great Fade",
    "The Prismatic Academy",
    "Color Artificers",
    "Pallette devices",
    "Chroma",
    "Prism Fragments",
  ];
  const boldKeywords = (text: string, keywords: string[]) => {
    let parts = [text];

    keywords.forEach((keyword) => {
      // Escape special regex characters in the keyword
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      parts = parts.flatMap((part) => {
        // Skip if this part is already a React element (bold)
        if (typeof part !== "string") return [part];

        // Split the text by the keyword
        const splits = part.split(new RegExp(`(${escapedKeyword})`, "g"));
        return splits.map((split, index) =>
          split === keyword ? <b key={index + keyword}>{split}</b> : split
        );
      }) as string[];
    });

    return parts;
  };

  const sceneTextSelector = () => {
    switch (sceneNumber) {
      case 1:
        return textInput.slide_1;
      case 2:
        return textInput.slide_2;
      case 3:
        return textInput.slide_3;
      default:
        return textInput.slide_1;
    }
  };

  return (
    <div className="z-[11] absolute w-full h-full flex flex-col justify-between items-center px-20 bg-transparent select-none">
      <div className="nico uppercase flex justify-between items-end w-full h-[10%] bg-transparent">
        <motion.div
          initial={{ opacity: 0.5, scale: 1 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          whileTap={{ opacity: 0.9, scale: 0.9 }}
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={"/return.svg"} className="w-4 h-4" />
          <p>Back to title</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, scale: 1 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          whileTap={{ opacity: 0.9, scale: 0.9 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
          </svg>
          <p>Hide UI</p>
        </motion.div>
      </div>
      <div className="flex flex-col justify-between w-full h-[25%] bg-transparent pb-2 pt-4">
        <div className="flex flex-col gap-4">
          <h1 className="nico text-[1.5rem]">{textInput.speaker}</h1>
          <p className="montserrat whitespace-pre-line text-[1rem] tracking-wide opacity-80">
            <span>{boldKeywords(sceneTextSelector().line_1, keywords)}</span>{" "}
            <span>{boldKeywords(sceneTextSelector().line_2, keywords)}</span>{" "}
            <span>{boldKeywords(sceneTextSelector().line_3, keywords)}</span>
          </p>
        </div>

        <div className="nico w-full justify-between flex items-center">
          <motion.p
            animate={{ opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="text-[0.7rem]"
          >
            Press any key to continue...
          </motion.p>
          <div className="flex gap-10">
            <AudioController fillColor="white" fillOpacity={0.5} />
            <div className="uppercase flex gap-4">
              <span
                className="cursor-pointer opacity-50 hover:opacity-100 duration-300"
                onClick={() =>
                  sceneNumber === 3
                    ? setCurrentSlide((prev) => prev - 1)
                    : sceneNumber === 1
                    ? location.reload()
                    : setCurrentSlide((prev) => prev - 1)
                }
              >
                Back
              </span>{" "}
              <span className="opacity-50">|</span>
              <span
                className="cursor-pointer opacity-50 hover:opacity-100 duration-300"
                onClick={() => startGame()}
              >
                Skip
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// IMAGE CONTAINER COMPONENT***********************************************************************
const ImageContainer = ({ sceneNumber }: { sceneNumber: number }) => {
  const src = `/images/${sceneNumber}.png`;
  return (
    <div className="w-full h-full flex justify-center items-center">
      <img src={src} alt={`Image ${src}`} className="w-full h-full object-" />
    </div>
  );
};

// MAIN CUTSCENE COMPONENT***********************************************************************
const CutScene = () => {
  const textObject = cutsceneText as CutsceneTextObject;
  const [currentSlide, setCurrentSlide] = useState(1);
  const { startGame } = useGameStore();

  useEffect(() => {
    const handlePress = (event: KeyboardEvent) => {
      if (event && currentSlide < 3) {
        setCurrentSlide(currentSlide + 1);
      } else if (currentSlide === 3) {
        startGame();
      }
    };
    window.addEventListener("keydown", handlePress);

    return () => {
      window.removeEventListener("keydown", handlePress);
    };
  }, [currentSlide]);

  return (
    <div className="container max-w-full h-screen relative flex justify-center items-center text-white">
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
