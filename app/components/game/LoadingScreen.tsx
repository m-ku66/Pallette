import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="container max-w-full h-screen flex flex-col gap-8 justify-center items-center bg-white relative">
      {/* Color circle with pulsing rings */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400"
          animate={{
            scale: [1, 1.2, 1],
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Pulsing rings */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full border-2 border-black/20"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Cute loading text */}
      <div className="flex flex-col items-center gap-2 pt-10">
        <motion.p
          className="nico text-[3rem] text-black/50 uppercase"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Mixing colors...
        </motion.p>
        <motion.p
          className="nico text-sm text-black/30"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          (｡･ω･｡)
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingScreen;
