import React, { useState } from "react";

const Menu = () => {
  return (
    <>
      <svg
        style={{ scale: 0.7 }}
        className="cursor-pointer"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 8H42V12H6V8ZM18 22H42V26H18V22ZM6 36H42V40H6V36Z"
          fill="black"
          fillOpacity="0.5"
        />
      </svg>
    </>
  );
};

export default Menu;
