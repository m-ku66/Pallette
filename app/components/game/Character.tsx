import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CharacterState {
  emotion: "neutral" | "surprised" | "disappointed" | "happy";
  state: "neutral" | "victory" | "defeat";
}

type Props = {
  targetColor: { r: number; g: number; b: number };
};

const Character = ({ targetColor }: Props) => {
  const [characterState, setCharacterState] = useState<CharacterState>({
    emotion: "neutral",
    state: "neutral",
  });
  const [clickable, setClickable] = useState(true);

  const renderMouth = () => {
    switch (characterState.emotion) {
      case "neutral":
        return (
          <Image
            src={"/character/mouth_1.png"}
            width={800}
            height={800}
            alt=""
          />
        );
      case "surprised":
        return (
          <Image
            src={"/character/mouth_2.png"}
            width={800}
            height={800}
            alt=""
          />
        );
      case "disappointed":
        return (
          <Image
            src={"/character/mouth_3.png"}
            width={800}
            height={800}
            alt=""
          />
        );
      default:
        return (
          <Image
            src={"/character/mouth_1.png"}
            width={800}
            height={800}
            alt=""
          />
        );
    }
  };

  const renderHand = () => {
    switch (characterState.state) {
      case "neutral":
        return (
          <Image
            src={"/character/hand_1.png"}
            width={800}
            height={800}
            alt=""
            className="absolute bottom-[-45%] left-[-15%]"
          />
        );
      case "victory":
        return (
          <Image
            src={"/character/hand_2.png"}
            width={800}
            height={800}
            alt=""
            className="absolute bottom-[-40%] left-[-40%]"
          />
        );
      case "defeat":
        return (
          <Image
            src={"/character/hand_1.png"}
            width={800}
            height={800}
            alt=""
            className="absolute bottom-[-45%] left-[-15%]"
          />
        );
    }
  };

  const handleClick = () => {
    setClickable(false);
    const emotions: CharacterState["emotion"][] = ["happy", "surprised"];
    if (characterState.emotion === "neutral") {
      setCharacterState((prev) => ({
        ...prev,
        emotion: emotions[Math.floor(Math.random() * emotions.length)],
      }));
    }

    setTimeout(() => {
      setCharacterState((prev) => ({
        ...prev,
        emotion: "neutral",
      }));
      setClickable(true);
    }, 2000);
  };

  const ANIM_DURATION = 1;

  return (
    <motion.div
      animate={{
        scaleY: ["102%", "100%", "102%"],
      }}
      transition={{
        duration: ANIM_DURATION + 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className="z-[10] w-[400px] h-[400px] bg-transparent absolute left-5 bottom-0 origin-bottom"
      onClick={() => {
        clickable && handleClick();
      }}
      style={{ cursor: clickable ? "pointer" : "default", scale: 1 }}
    >
      {/* BACK HAIR */}
      <motion.div className="absolute z-[10]">
        <Image
          src={"/character/back_hair.png"}
          width={800}
          height={800}
          alt=""
        />
      </motion.div>

      {/* BODY */}
      <motion.div className="absolute z-[11]">
        <Image src={"/character/body.png"} width={800} height={800} alt="" />
      </motion.div>

      {/* NECK */}
      <motion.div className="absolute z-[12]">
        <Image src={"/character/neck.png"} width={800} height={800} alt="" />
      </motion.div>

      {/* EARS */}
      <motion.div className="absolute w-full h-full">
        <Image
          src={"/character/ear_l.png"}
          width={800}
          height={800}
          alt=""
          className="absolute z-[13]"
        />
        <Image
          src={"/character/ear_r.png"}
          width={800}
          height={800}
          alt=""
          className="absolute z-[13]"
        />
      </motion.div>

      {/* HEAD */}
      <motion.div
        animate={{ bottom: ["0%", "-1%", "0%"] }}
        transition={{
          duration: ANIM_DURATION + 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute w-full h-full"
      >
        <Image
          src={"/character/head.png"}
          width={800}
          height={800}
          alt=""
          className="absolute z-[14]"
        />
      </motion.div>

      {/* FACE */}
      <motion.div
        animate={{ bottom: ["0%", "-1%", "0%"] }}
        transition={{
          duration: ANIM_DURATION + 2.1,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute w-full h-full"
      >
        {/* PUPILS */}
        <motion.div className="absolute w-full h-full">
          <Image
            src={"/character/pupil_l.png"}
            width={800}
            height={800}
            alt=""
            className="absolute z-[15]"
          />
          <Image
            src={"/character/pupil_r.png"}
            width={800}
            height={800}
            alt=""
            className="absolute z-[15]"
          />
        </motion.div>

        {/* LASHES */}
        <motion.div
          style={{
            bottom:
              characterState.emotion === "surprised"
                ? "2%"
                : characterState.emotion === "disappointed" ||
                  characterState.emotion === "happy"
                ? "-2%"
                : "0%",
          }}
          className="absolute w-full h-full"
        >
          <Image
            src={"/character/lash_l.png"}
            width={800}
            height={800}
            alt=""
            className="absolute z-[17]"
          />
          <Image
            src={"/character/lash_r.png"}
            width={800}
            height={800}
            alt=""
            className="absolute z-[17]"
          />
        </motion.div>

        {/* EYE BOTTOMS */}
        <motion.div
          style={{
            bottom:
              characterState.emotion === "surprised"
                ? "-2%"
                : characterState.emotion === "disappointed"
                ? "0%"
                : characterState.emotion === "happy"
                ? "3%"
                : "0%",
          }}
          className="absolute w-full h-full"
        >
          <Image
            src={"/character/eye_bottom_l.png"}
            width={800}
            height={800}
            alt=""
            className="absolute z-[16]"
          />
          <Image
            src={"/character/eye_bottom_r.png"}
            width={800}
            height={800}
            alt=""
            className="absolute z-[16]"
          />
        </motion.div>

        {/* MOUTH */}
        <motion.div
          style={{ bottom: characterState.emotion === "happy" ? "1%" : "0%" }}
          className="absolute z-[18]"
        >
          {renderMouth()}
        </motion.div>
      </motion.div>

      {/* BROWS */}
      <motion.div
        style={{
          bottom:
            characterState.emotion === "surprised"
              ? "5%"
              : characterState.emotion === "disappointed"
              ? "-5%"
              : "0%",
        }}
        className="absolute w-full h-full"
      >
        <Image
          src={"/character/brow_l.png"}
          width={800}
          height={800}
          alt=""
          className="absolute z-[18]"
        />
        <Image
          src={"/character/brow_r.png"}
          width={800}
          height={800}
          alt=""
          className="absolute z-[18]"
        />
      </motion.div>

      {/* BANGS */}
      <motion.div
        animate={{ bottom: ["0%", "0%", "-0.5%", "-1%", "-0.5%", "0%", "0%"] }}
        transition={{
          duration: ANIM_DURATION + 2.2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute w-full h-full"
      >
        <Image
          src={"/character/bangs.png"}
          width={800}
          height={800}
          alt=""
          className="absolute z-[17]"
        />
      </motion.div>

      {/* NECKLACE */}
      <motion.div className="absolute w-full h-full">
        <Image
          src={"/character/necklace.png"}
          width={800}
          height={800}
          alt=""
          className="absolute z-[17]"
        />
      </motion.div>

      {/* HAND */}
      <motion.div
        animate={{ bottom: ["0%", "-1%", "-2%", "-1%", "0%"] }}
        transition={{
          duration: ANIM_DURATION + 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute w-full h-full z-[17]"
      >
        {renderHand()}
      </motion.div>

      {/* BUBBLE */}
      <svg
        className="scale-75 right-0 rotate-12 absolute z-[17]"
        width="140"
        height="158"
        viewBox="0 0 140 158"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.4863 157.077L51.3435 137.003C60.7905 139.654 70.5153 140.272 80.256 138.835C118.212 133.233 144.535 97.7951 138.934 59.8386C133.332 21.881 97.8951 -4.44298 59.9386 1.15839C21.9822 6.75975 -4.34055 42.1979 1.26098 80.1555C3.41397 94.7447 9.95968 107.986 20.2111 118.506L11.4863 157.077ZM16.0994 151.174L23.042 120.479L23.7408 117.52C13.6151 107.388 6.5189 93.8933 4.4227 79.6889C-0.921497 43.475 24.1927 9.66528 60.4054 4.32124C96.6181 -1.0228 130.428 24.0913 135.772 60.3052C141.116 96.519 116.002 130.327 79.7891 135.671C70.2704 137.075 60.1803 136.254 50.9617 133.566L16.0994 151.174Z"
          fill="black"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.0994 151.174L23.042 120.479L23.7408 117.52C13.6151 107.388 6.5189 93.8933 4.4227 79.6889C-0.921497 43.475 24.1927 9.66528 60.4054 4.32124C96.6181 -1.0228 130.428 24.0913 135.772 60.3052C141.116 96.519 116.002 130.327 79.7891 135.671C70.2704 137.075 60.1803 136.254 50.9617 133.566L16.0994 151.174ZM101.541 108.098C123.183 90.9472 126.825 59.4991 109.674 37.8564C92.5239 16.2137 61.0758 12.5722 39.4331 29.7227C17.7905 46.8732 14.1489 78.3213 31.2994 99.964C48.4499 121.607 79.898 125.248 101.541 108.098Z"
          fill="white"
        />
        <path
          d="M109.674 37.8564C126.825 59.4991 123.183 90.9472 101.541 108.098C79.898 125.248 48.4499 121.607 31.2994 99.964C14.1489 78.3213 17.7905 46.8732 39.4331 29.7227C61.0758 12.5722 92.5239 16.2137 109.674 37.8564Z"
          fill={`rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})`}
        />
      </svg>
    </motion.div>
  );
};

export default Character;
