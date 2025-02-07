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
      className="absolute inset-0 z-[200] bg-white/[0.85] flex flex-col justify-between items-center w-full h-full pb-12"
    >
      <div className="px-6 w-full h-[10%] flex justify-end bg-transparent">
        <motion.img
          src="/close-line.svg"
          alt="close"
          className="p-4 cursor-pointer inline-block bg-white"
          style={{ scale: 1 }}
          initial={{ scale: 1, opacity: 0.5 }}
          whileHover={{ scale: 1.1, opacity: 1 }}
          whileTap={{ scale: 0.5, opacity: 0.8 }}
          onClick={() => setIsPaused(false)}
        />
      </div>
      <div className="px-12 flex w-full justify-between">
        <motion.ul>
          {menuOptions.map((option) => (
            <motion.li
              key={option}
              className="text-[3rem] font-bold cursor-pointer group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="flex gap-4 items-center">
                <RollingText text={option.toUpperCase()} />
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
      </div>
    </motion.div>
  );
};

export default PauseOverlay;
