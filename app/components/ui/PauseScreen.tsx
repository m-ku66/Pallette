import { motion } from "framer-motion";
import useGameStore from "../../store/gameStore";
import RollingText from "./RollingText";

const PauseOverlay = () => {
  const { isPaused, setIsPaused } = useGameStore();

  if (!isPaused) return null;

  const menuOptions = ["portfolio", "github", "title", "resume"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[200] bg-white/[0.85] flex justify-start items-end w-full h-full p-12"
    >
      <motion.ul>
        {menuOptions.map((option) => (
          <motion.li
            key={option}
            className="text-[3rem] font-bold cursor-pointer group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPaused(false)}
          >
            <div className="flex gap-4 items-center">
              <RollingText
                text={option.toUpperCase()}
                duration={0.5}
                delay={0}
              />
              <div className="w-4 h-4 rounded-full bg-neutral-900 opacity-0 group-hover:opacity-100 duration-300"></div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
      <motion.img
        src="/copyright.png"
        alt="Made by Marc Miango 2025 all rights reserved"
        className="absolute bottom-0 right-0 p-4 cursor-pointer inline-block"
        style={{ scale: 0.7 }}
        initial={{ scale: 0.7, opacity: 0.5 }}
        whileHover={{ scale: 0.8, opacity: 1 }}
        whileTap={{ scale: 0.6, opacity: 0.8 }}
      />
      {/* <motion.img
        src="/close-line.svg"
        alt="close"
        className="absolute top-[-80%] right-[-45%] -translate-x-1/2 -translate-y-1/2 p-4 cursor-pointer"
        style={{ scale: 0.04 }}
        initial={{ scale: 0.04, opacity: 0.5 }}
        whileHover={{ scale: 0.15, opacity: 1 }}
        whileTap={{ scale: 0.11, opacity: 0.8 }}
      /> */}
    </motion.div>
  );
};

export default PauseOverlay;
