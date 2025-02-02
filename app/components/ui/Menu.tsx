import React from "react";
import useGameStore from "@/app/store/gameStore";

const Menu = () => {
  const { isPaused, setIsPaused } = useGameStore();

  const handlePause = () => {
    isPaused ? setIsPaused(false) : setIsPaused(!isPaused);
  };

  return (
    <>
      <svg
        style={{ scale: 0.7 }}
        onClick={handlePause}
        className="opacity-50 cursor-pointer hover:opacity-100 hover:scale-110 active:scale-90 duration-150 ease-in-out"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 8H42V12H6V8ZM18 22H42V26H18V22ZM6 36H42V40H6V36Z"
          fill="black"
          fillOpacity="1"
        />
      </svg>
    </>
  );
};

export default Menu;
