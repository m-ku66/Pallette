import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const colors = [
  "#7A0000",
  "#C20000",
  "#FF0000",
  "#009100",
  "#00CF00",
  "#00FF00",
  "#000080",
  "#0000BB",
  "#0000FF",
  "#FFFFFF",
];
type Props = {
  setIsWaiting: React.Dispatch<React.SetStateAction<boolean>>;
};

const BufferPage = ({ setIsWaiting }: Props) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsWaiting(false);
    }, colors.length * 200 + 200); // Ensure animation finishes before transitioning
  };

  return (
    <div className="container max-w-full h-screen flex justify-center items-center overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: [0, 1], y: [100, -10, 0] }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.1 }}
        onClick={handleClick}
        className="w-[20%] aspect-square bg-black rounded-full cursor-pointer z-10"
      ></motion.div>
      <AnimatePresence>
        {isAnimating &&
          colors.map((color, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 100, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.13,
                ease: [0.9, 0, 1, 1],
              }}
              className="z-10 absolute w-screen h-screen aspect-square top-0 left-0 flex justify-center items-center"
            >
              <div
                style={{ backgroundColor: color, borderRadius: "100%" }}
                className="w-[20%] aspect-square"
              ></div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default BufferPage;
