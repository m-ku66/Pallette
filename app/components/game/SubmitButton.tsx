import React from "react";
import { RGB } from "@/app/types";
import { motion } from "framer-motion";

interface SubmitButtonProps {
  size: number;
  isSubmitting: boolean;
  currentColor: RGB;
  onSubmit: () => void;
}

export const SubmitButton = React.memo(
  ({
    size,
    isSubmitting,
    currentColor,
    onSubmit,
  }: {
    size: number;
    isSubmitting: boolean;
    currentColor: RGB;
    onSubmit: () => void;
  }) => {
    const diamondSize = size / 14;

    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ width: `${size / 6}px` }}
        onClick={onSubmit}
        className={`flex justify-center items-center rounded-full aspect-square 
          bg-[#F8F8F8] drop-shadow-lg cursor-pointer
          ${isSubmitting ? "opacity-50" : ""}`}
      >
        <svg
          width={diamondSize}
          height={diamondSize}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.38134 14.3115L14.9678 2.59464C15.5013 1.94261 16.4982 1.94261 17.0317 2.59464L26.6182 14.3115C27.4218 15.2937 27.4218 16.7064 26.6182 17.6887L17.0317 29.4055C16.4982 30.0575 15.5013 30.0575 14.9678 29.4055L5.38134 17.6887C4.57764 16.7064 4.57764 15.2937 5.38134 14.3115Z"
            fill={`rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`}
          />
        </svg>
      </motion.div>
    );
  }
);

SubmitButton.displayName = "SubmitButton";
