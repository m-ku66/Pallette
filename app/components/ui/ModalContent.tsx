import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { titleStates } from "../../types";
import useGameStore from "@/app/store/gameStore";

type Props = {
  setComponentState: React.Dispatch<React.SetStateAction<titleStates>>;
  startGame: () => void;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  state?: titleStates;
};

const ModalContent = ({
  setComponentState,
  startGame,
  modal,
  setModal,
  state = "playing",
}: Props) => {
  const { startCutscene, gameState } = useGameStore();
  const [isVisible, setIsVisible] = useState(false);

  // Handle mounting/unmounting
  useEffect(() => {
    if (modal) {
      // Small delay to ensure clean mounting
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      isVisible && setIsVisible(false);
    }
  }, [modal]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      setIsVisible(false);
    };
  }, []);

  if (!modal) return null;

  function handleClick() {
    if (state === "initial") {
      setComponentState("cutscene");
      startCutscene();
    } else {
      location.reload();
    }
  }

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5, ease: [0.87, 0, 0.13, 1] }}
      onClick={() => setModal(false)}
      className="absolute z-[100] w-full h-full flex justify-center items-center bg-black/[0.85]"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="nico w-[60%] h-[60%] flex justify-center items-center flex-col bg-white rounded-lg outline outline-4 outline-neutral-400 px-[10%]"
      >
        <AnimatePresence mode="wait">
          <motion.h1
            key={`title-${gameState}`}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-[2rem] text-center mb-[10%] select-none text-neutral-900"
          >
            {gameState === "cutscene"
              ? "Are you ready to play?"
              : "Would you like to watch a cutscene?"}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${gameState}`}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="text-[0.8rem] text-center w-[50%] mb-[10%] flex flex-col gap-2 text-neutral-900"
          >
            <p className="montserrat whitespace-pre-line select-none">
              {gameState === "cutscene"
                ? "Use your Pallette to mix and match colors!"
                : "The cutscene provides lore and information about the game (~1 minute read)"}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col gap-8 items-center w-full">
          <motion.button
            initial={{ scale: 1, opacity: 0.5 }}
            whileHover={{ scale: 1.1, opacity: 1 }}
            whileTap={{ scale: 0.9, opacity: 0.8 }}
            onClick={() => startGame()}
            className="bg-white text-neutral-900 rounded-lg px-4 py-2 w-[50%] drop-shadow-md outline outline-1 outline-neutral-400"
          >
            {state === "initial" ? "No, let's play" : "Yes, let's play"}
          </motion.button>
          <motion.button
            initial={{ scale: 1, opacity: 0.5 }}
            whileHover={{ scale: 1.1, opacity: 1 }}
            whileTap={{ scale: 0.9, opacity: 0.8 }}
            onClick={() => handleClick()}
            className="bg-white text-neutral-900 rounded-lg px-4 py-2 w-[50%] drop-shadow-md outline outline-1 outline-neutral-400"
          >
            {state === "initial" ? "Yes" : "No, back to title"}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModalContent;
