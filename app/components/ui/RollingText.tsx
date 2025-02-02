import React from "react";
import { motion } from "framer-motion";

type Props = {
  text: string;
  duration: number;
  delay: number;
};

const RollingText = ({ text, duration, delay }: Props) => {
  return (
    <div className="nico opacity-50 hover:opacity-100 duration-150 active:opacity-100">
      {text}
    </div>
  );
};

export default RollingText;
