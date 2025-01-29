import React from "react";
import { RGB } from "@/app/types";
import { motion } from "framer-motion";

interface ColorDisplayProps {
  size: number;
  currentColor: RGB;
  onReset: () => void;
}

export const ColorDisplay: React.FC<ColorDisplayProps> = ({
  size,
  currentColor,
  onReset,
}) => (
  <>
    <circle
      cx={size / 2}
      cy={size / 2}
      r={size / 3}
      fill="#F8F8F8"
      className="drop-shadow-lg"
    />
    <motion.circle
      cx={size / 2}
      cy={size / 2}
      r={size / 4.5}
      fill={`rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`}
      onClick={onReset}
      className="cursor-pointer origin-center hover:scale-105 active:scale-95 transition-transform duration-200 ease-in-out"
      style={{ outline: "none" }}
    />
  </>
);
