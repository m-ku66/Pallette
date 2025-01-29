import { RGB } from "@/app/types";

const calculateColorDifference = (color1: RGB, color2: RGB) => {
  return Math.sqrt(
    Math.pow(color1.r - color2.r, 2) +
      Math.pow(color1.g - color2.g, 2) +
      Math.pow(color1.b - color2.b, 2)
  );
};

export default calculateColorDifference;
