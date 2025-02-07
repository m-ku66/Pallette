import { motion } from "framer-motion";
import AudioController from "../../ui/AudioController";
import { useEffect, useState } from "react";
import TextReveal from "./TextReveal";
import Image from "next/image";

type UIContainerProps = {
  textInput: any;
  sceneNumber: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
};
const UIContainer = ({
  textInput,
  sceneNumber,
  setCurrentSlide,
  setModal = () => {},
}: UIContainerProps) => {
  const keywords = [
    "absence of color",
    "The Great Fade",
    "The Prismatic Academy",
    "Color Artificers",
    "Pallette devices",
    "Chroma",
    "Prism Fragments",
  ];
  const [sceneProgress, setsceneProgress] = useState(1);
  const [renderedLines, setRenderedLines] = useState<number[]>([1]);
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

  useEffect(() => {
    const handlePress = (event: KeyboardEvent) => {
      if (event && sceneProgress < 3) {
        setsceneProgress((prev) => prev + 1);
        setRenderedLines((prev) => [...prev, sceneProgress + 1]);
      }

      if (sceneProgress === 3) {
        setCurrentSlide(sceneNumber === 3 ? 1 : sceneNumber + 1);
        setsceneProgress(1);
        setRenderedLines([1]);
      }

      if (sceneNumber === 3 && sceneProgress === 3) {
        setModal(true);
      }
    };
    window.addEventListener("keydown", handlePress);
    return () => window.removeEventListener("keydown", handlePress);
  }, [sceneNumber, sceneProgress, setCurrentSlide, setModal]);

  return (
    <motion.div
      initial={{
        clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
        opacity: 0,
      }}
      animate={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: [0, 1],
      }}
      transition={{
        duration: 1,
        ease: [0.87, 0, 0.13, 1],
        delay: 1,
      }}
      className="z-[11] absolute w-full h-full flex flex-col justify-between items-center px-20 bg-transparent select-none"
    >
      <div className="nico uppercase flex justify-between items-end w-full h-[10%] bg-transparent">
        <motion.div
          initial={{ opacity: 0.5, scale: 1 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          whileTap={{ opacity: 0.9, scale: 0.9 }}
          onClick={() => location.reload()}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image
            src={"/return.svg"}
            alt="return"
            width={0}
            height={0}
            className="w-4 h-4"
          />
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
      <div className="flex flex-col justify-between w-full h-[25%] bg-transparent pb-4 pt-2">
        <div className="flex flex-col gap-4">
          <h1 className="nico text-[1.5rem]">{textInput.speaker}</h1>
          <p className="montserrat whitespace-pre-line text-[0.9rem] tracking-wide opacity-80">
            {renderedLines.includes(1) && (
              <TextReveal
                key={`scene-${sceneNumber}-line-1`}
                text={boldKeywords(sceneTextSelector().line_1, keywords)}
              />
            )}
            {renderedLines.includes(2) && (
              <TextReveal
                key={`scene-${sceneNumber}-line-2`}
                text={boldKeywords(sceneTextSelector().line_2, keywords)}
              />
            )}
            {renderedLines.includes(3) && (
              <TextReveal
                key={`scene-${sceneNumber}-line-3`}
                text={boldKeywords(sceneTextSelector().line_3, keywords)}
              />
            )}
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
                onClick={() => setModal(true)}
              >
                Skip
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UIContainer;
