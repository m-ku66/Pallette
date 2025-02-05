import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Props = {
  text: (string | React.ReactElement)[];
};

const TextReveal = ({ text }: Props) => {
  // Get total character count before starting animations
  const totalCharCount = text.reduce((count, element) => {
    if (React.isValidElement(element)) return count + 1;
    return count + (element as string).length;
  }, 0);

  let charCount = 0;

  const [visibleText, setVisibleText] = useState(text);
  useEffect(() => {
    setVisibleText(text);
  }, [text]);

  return (
    <span>
      {visibleText.map((element, i) => {
        if (React.isValidElement(element)) {
          const elementDelay = (charCount / totalCharCount) * 2; // 2 second total animation
          charCount += 1;
          return (
            <motion.span
              key={`element-${i}`}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{ duration: 0.2, delay: elementDelay }}
            >
              {element}
            </motion.span>
          );
        }

        return Array.from(element as string).map((char, j) => {
          const delay = (charCount / totalCharCount) * 2;
          charCount += 1;
          return (
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{ duration: 0.2, delay }}
              key={`${char}-${j}-${i}`}
            >
              {char}
            </motion.span>
          );
        });
      })}
    </span>
  );
};

export default TextReveal;
