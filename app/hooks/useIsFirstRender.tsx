import { useRef, useEffect } from "react";

// Custom hook to track if this is the first render
export const useIsFirstRender = () => {
  const isFirst = useRef(true);

  useEffect(() => {
    isFirst.current = false;
  }, []);

  return isFirst.current;
};
