import React, { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface TransitionScreenProps {
  accuracy?: string;
}

const TIMING = {
  PANELS_IN: 0.6,
  WHITE_DELAY: 0.2,
  TEXT_DELAY: 0.0,
  TEXT_DURATION: 1.2,
  TOTAL_DURATION: 3,
  EXIT_DELAY: 0.5,
} as const;

type AnimationPhase = "initial" | "entering" | "showing" | "exiting";

const Panel = memo(
  ({
    side,
    isWhite = false,
    phase,
    delay = 0,
  }: {
    side: "left" | "right";
    isWhite?: boolean;
    phase: AnimationPhase;
    delay?: number;
  }) => {
    const xPos = side === "left" ? "-100%" : "100%";

    const variants = {
      initial: { x: xPos },
      entering: {
        x: "0%",
        transition: {
          delay,
          duration: TIMING.PANELS_IN,
          ease: [0.87, 0, 0.13, 1],
        },
      },
      showing: { x: "0%" },
      exiting: {
        x: xPos,
        transition: {
          delay: TIMING.EXIT_DELAY,
          duration: TIMING.PANELS_IN + TIMING.WHITE_DELAY,
          ease: [0.87, 0, 0.13, 1],
        },
      },
    };

    return (
      <motion.div
        initial="initial"
        animate={phase}
        variants={variants}
        className={`
        w-[50%] h-full
        ${isWhite ? "bg-white" : "bg-black"}
        flex
        ${side === "left" ? "justify-start pl-8" : "justify-end pr-8"}
        py-8
      `}
      >
        {isWhite && (
          <Image
            src="/panel.png"
            width={500}
            height={500}
            alt="Panel decoration"
            className={`object-fill w-full h-full ${
              side === "right" ? "scale-x-[-1]" : ""
            }`}
          />
        )}
      </motion.div>
    );
  }
);

Panel.displayName = "Panel";

const TransitionScreen = memo(
  ({ accuracy = "Nothing yet..." }: TransitionScreenProps) => {
    const [phase, setPhase] = useState<AnimationPhase>("initial");
    const [isFirstRender, setIsFirstRender] = useState(true);
    const characters = Array.from(accuracy.toUpperCase());

    useEffect(() => {
      // Start the animation sequence after first render
      if (isFirstRender) {
        setIsFirstRender(false);
        requestAnimationFrame(() => {
          setPhase("entering");
        });
      }

      let timeouts: NodeJS.Timeout[] = [];

      if (phase === "entering") {
        // Move to showing phase after panels are in
        timeouts.push(
          setTimeout(() => {
            setPhase("showing");
          }, (TIMING.PANELS_IN + TIMING.WHITE_DELAY) * 1000)
        );
      } else if (phase === "showing") {
        // Start exit phase after display duration
        timeouts.push(
          setTimeout(() => {
            setPhase("exiting");
          }, TIMING.TEXT_DURATION * 1000) //
        );
      }

      console.log(phase);
      return () => {
        timeouts.forEach(clearTimeout);
      };
    }, [phase, isFirstRender]);

    const textVariants = {
      initial: { opacity: 0, y: -10 },
      entering: { opacity: 0, y: -10 },
      showing: {
        opacity: [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 0,
        ], // add fade out to anim since exit anim isn't working
        y: 0,
        transition: {
          delay: TIMING.TEXT_DELAY,
          duration: TIMING.TEXT_DURATION,
          ease: [0.87, 0, 0.13, 1],
        },
      },
      exiting: {
        opacity: 0,
        y: 10,
        transition: {
          duration: TIMING.TEXT_DURATION,
          ease: [0.87, 0, 0.13, 1],
        },
      },
    };

    return (
      <div className="z-[100] w-full h-full bg-transparent flex absolute justify-center items-center nico text-[5rem] text-center">
        {/* Black Panels */}
        <div className="absolute z-[101] w-full h-full flex">
          <Panel side="left" phase={phase} />
          <Panel side="right" phase={phase} />
        </div>

        {/* White Panels */}
        <div className="absolute z-[102] w-full h-full flex">
          <Panel side="left" isWhite phase={phase} delay={TIMING.WHITE_DELAY} />
          <Panel
            side="right"
            isWhite
            phase={phase}
            delay={TIMING.WHITE_DELAY}
          />
        </div>

        {/* Text */}
        <motion.div
          variants={textVariants}
          initial="initial"
          animate={phase}
          className="absolute z-[103] flex"
        >
          {characters.map((char, i) => (
            <motion.div
              key={`${char}-${i}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{
                opacity: phase === "showing" ? 1 : 0,
                y: phase === "showing" ? 0 : 5,
              }}
              transition={{
                duration: 0.05,
                delay: phase === "showing" ? 0.1 * i : 0,
                ease: [0.87, 0, 0.13, 1],
              }}
            >
              {char}
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }
);

TransitionScreen.displayName = "TransitionScreen";

export default TransitionScreen;
