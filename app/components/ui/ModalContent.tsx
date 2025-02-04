import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { titleStates } from "../../types";
import useGameStore from "@/app/store/gameStore";

type Props = {
  setComponentState: React.Dispatch<React.SetStateAction<titleStates>>;
  startGame: () => void;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContent = ({
  setComponentState,
  startGame,
  modal,
  setModal,
}: Props) => {
  const { startCutscene } = useGameStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.87, 0, 0.13, 1] }}
      onClick={() => setModal(false)}
      className="absolute z-[100] w-full h-full flex justify-center items-center bg-black/[0.85]"
    >
      <motion.div className="nico w-[60%] h-[60%] flex justify-center items-center flex-col bg-white rounded-lg outline outline-4 outline-neutral-400 px-[10%]">
        <motion.h1 className="text-[2rem] text-center mb-[10%] select-none">
          Would you like to watch a cutscene?
        </motion.h1>

        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="text-[0.8rem] text-center w-[50%] mb-[10%] flex flex-col gap-2"
        >
          <p className="whitespace-pre-line select-none">
            {` The custscene provides lore and information about the game\n(~1 minute read)`}
          </p>
        </motion.div>

        <div className="flex flex-col gap-8 items-center w-full">
          <motion.button
            initial={{ scale: 1, opacity: 0.5 }}
            whileHover={{ scale: 1.1, opacity: 1 }}
            whileTap={{ scale: 0.9, opacity: 0.8 }}
            onClick={() => startGame()}
            className="bg-white text-neutral-900 rounded-lg px-4 py-2 w-[50%] drop-shadow-md outline outline-1 outline-neutral-400"
          >
            No, let's play
          </motion.button>
          <motion.button
            initial={{ scale: 1, opacity: 0.5 }}
            whileHover={{ scale: 1.1, opacity: 1 }}
            whileTap={{ scale: 0.9, opacity: 0.8 }}
            onClick={() => {
              setComponentState("cutscene");
              startCutscene();
            }}
            className="bg-white text-neutral-900 rounded-lg px-4 py-2 w-[50%] drop-shadow-md outline outline-1 outline-neutral-400"
          >
            Yes
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModalContent;
