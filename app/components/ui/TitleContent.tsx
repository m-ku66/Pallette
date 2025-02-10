import React from "react";
import { motion } from "framer-motion";
import AudioController from "./AudioController";

const TitleContent = () => {
  // Letter paths data with proper sequencing
  const letterPaths = [
    {
      d: "M14.6797 62.162C14.2448 66.5116 11.8525 68.8676 7.50297 69.23C5.47318 69.23 3.69712 68.5776 2.17477 67.2727C0.724925 65.8954 0 64.1918 0 62.162V10.8373C0.0724925 8.80755 0.833663 7.14022 2.28351 5.83536C3.73336 4.458 5.47318 3.76933 7.50297 3.76933H53.1732C59.5526 3.9868 64.3733 5.40041 67.6355 8.01013C70.8976 10.5474 73.2536 13.4471 74.7035 16.7092C76.1533 19.9714 76.8783 23.2698 76.8783 26.6045C76.8783 30.0841 76.1533 33.455 74.7035 36.7172C73.3261 39.9793 70.9701 42.9153 67.6355 45.525C64.3733 48.0622 60.205 49.2946 55.1305 49.2221H27.7284C25.6986 49.2221 23.995 48.4972 22.6176 47.0473C21.1678 45.67 20.4429 43.9664 20.4429 41.9366C20.4429 39.9068 21.1316 38.2032 22.5089 36.8259C23.9588 35.376 25.6986 34.6511 27.7284 34.6511H55.783C57.1603 34.6511 58.2839 34.2162 59.1539 33.3463C60.0963 32.4038 60.7849 31.3527 61.2199 30.1928C61.6548 28.9605 61.8723 27.7281 61.8723 26.4957C61.8723 25.3358 61.6548 24.176 61.2199 23.0161C60.7849 21.7837 60.0963 20.7326 59.1539 19.8627C58.2839 18.9203 57.1603 18.4128 55.783 18.3403H17.5069C15.6221 18.4128 14.6797 19.3552 14.6797 21.1675V62.162Z",
      index: 0,
    },
    {
      d: "M112.871 51.0707C112.871 49.0409 113.559 47.3373 114.937 45.9599C116.387 44.5101 118.126 43.7852 120.156 43.7852H136.793L133.966 35.7385C132.806 32.7663 131.646 29.9754 130.486 27.3656C129.399 24.6834 128.13 22.2549 126.681 20.0801C125.376 17.9054 123.89 16.7455 122.222 16.6005C120.482 16.7455 118.924 17.9054 117.547 20.0801C116.169 22.2549 114.901 24.6834 113.741 27.3656C112.653 29.9754 111.53 32.7663 110.37 35.7385L100.04 64.0106C99.3147 65.5329 98.3723 66.8015 97.2124 67.8164C96.125 68.7588 94.4577 69.23 92.2104 69.23C90.1081 69.23 88.3683 68.5051 86.9909 67.0553C85.6861 65.6054 85.1061 63.8656 85.2511 61.8358C85.3236 60.8934 85.5411 60.0235 85.9035 59.2261L97.8648 28.3443C101.199 20.2251 104.534 13.6646 107.869 8.66258C111.131 3.73309 115.915 1.2321 122.222 1.15961C128.457 1.2321 133.205 3.73309 136.467 8.66258C139.802 13.5196 143.136 20.0801 146.471 28.3443L158.432 59.2261C158.795 60.0235 159.012 60.8934 159.085 61.8358C159.23 63.8656 158.613 65.6054 157.236 67.0553C155.931 68.5051 154.228 69.23 152.125 69.23C149.733 69.23 147.957 68.7588 146.797 67.8164C145.71 66.8015 144.804 65.5329 144.079 64.0106L142.013 58.3562H120.156C118.126 58.3562 116.423 57.6312 115.046 56.1814C113.596 54.804 112.871 53.1005 112.871 51.0707Z",
      index: 1,
    },
    {
      d: "M177.244 2.02954C179.274 2.02954 181.014 2.71822 182.464 4.09558C183.913 5.40044 184.675 7.06777 184.747 9.09756V35.3036C184.675 38.2758 184.856 41.0305 185.291 43.5677C185.798 46.0325 186.958 48.2435 188.77 50.2008C190.583 52.1581 192.866 53.2092 195.621 53.3542H230.417C232.447 53.4267 234.114 54.1879 235.419 55.6377C236.797 57.0876 237.485 58.8274 237.485 60.8572C237.413 62.8145 236.688 64.4818 235.311 65.8591C234.006 67.164 232.375 67.8527 230.417 67.9252H191.924C186.849 67.6352 182.645 65.9316 179.31 62.8145C176.048 59.6248 173.692 55.7465 172.242 51.1794C170.865 46.6124 170.14 41.7554 170.067 36.6084V9.09756C170.14 7.14026 170.865 5.50918 172.242 4.20431C173.62 2.82696 175.287 2.10203 177.244 2.02954Z",
      index: 2,
    },
    {
      d: "M255.101 2.02954C257.131 2.02954 258.871 2.71822 260.32 4.09558C261.77 5.40044 262.531 7.06777 262.604 9.09756V35.3036C262.531 38.2758 262.713 41.0305 263.148 43.5677C263.655 46.0325 264.815 48.2435 266.627 50.2008C268.44 52.1581 270.723 53.2092 273.478 53.3542H308.274C310.304 53.4267 311.971 54.1879 313.276 55.6377C314.654 57.0876 315.342 58.8274 315.342 60.8572C315.27 62.8145 314.545 64.4818 313.167 65.8591C311.863 67.164 310.231 67.8527 308.274 67.9252H269.781C264.706 67.6352 260.502 65.9316 257.167 62.8145C253.905 59.6248 251.549 55.7465 250.099 51.1794C248.722 46.6124 247.997 41.7554 247.924 36.6084V9.09756C247.997 7.14026 248.722 5.50918 250.099 4.20431C251.476 2.82696 253.144 2.10203 255.101 2.02954Z",
      index: 3,
    },
    {
      d: "M394.721 35.4123C394.721 37.4421 393.997 39.1456 392.547 40.523C391.169 41.9729 389.466 42.6978 387.436 42.6978H354.597C352.567 42.6978 350.827 42.0091 349.377 40.6317C348 39.1819 347.311 37.4421 347.311 35.4123C347.311 33.3825 348 31.6427 349.377 30.1928C350.827 28.8155 352.567 28.1268 354.597 28.1268H387.436C389.466 28.1268 391.169 28.8517 392.547 30.3016C393.997 31.6789 394.721 33.3825 394.721 35.4123Z",
      index: 4,
    },
    {
      d: "M350.9 3.76933H345.898C340.823 4.0593 336.655 6.01659 333.393 9.64121C330.131 13.1933 327.775 17.2529 326.325 21.8199C324.875 26.387 324.15 31.0627 324.15 35.8472C324.15 40.6317 324.839 45.3075 326.216 49.8745C327.666 54.4416 330.022 58.5374 333.284 62.162C336.619 65.7141 340.823 67.6352 345.898 67.9252H347.964H387.871C389.828 67.8527 391.459 67.164 392.764 65.8591C394.141 64.4818 394.866 62.8144 394.939 60.8571C394.939 58.8274 394.25 57.0875 392.873 55.6377C391.568 54.1878 389.901 53.4267 387.871 53.3542H349.595C346.84 53.2092 344.557 52.158 342.744 50.2007C340.932 48.2435 339.591 46.0324 338.721 43.5677C337.924 41.0305 337.525 38.457 337.525 35.8472C337.525 33.2375 337.924 30.7003 338.721 28.2355C339.591 25.6983 340.932 23.451 342.744 21.4937C344.557 19.5364 346.84 18.4853 349.595 18.3403H387.871C392.22 17.9778 394.576 15.6218 394.939 11.2723C394.939 9.24251 394.25 7.50269 392.873 6.05284C391.568 4.60299 389.901 3.84182 387.871 3.76933H350.9Z",
      index: 5,
    },
    {
      d: "M403.747 11.0548C403.747 9.02503 404.436 7.32146 405.813 5.9441C407.263 4.49425 409.003 3.76933 411.032 3.76933H474.318C476.348 3.76933 478.088 4.458 479.538 5.83536C480.915 7.28521 481.604 9.02503 481.604 11.0548C481.604 13.0846 480.879 14.8244 479.429 16.2743C478.052 17.6516 476.348 18.3403 474.318 18.3403H450.07V62.3795C449.635 66.729 447.242 69.085 442.893 69.4475C440.863 69.4475 439.087 68.7951 437.565 67.4902C436.115 66.1128 435.39 64.4093 435.39 62.3795V18.3403H411.032C409.003 18.3403 407.299 17.6154 405.922 16.1655C404.472 14.7882 403.747 13.0846 403.747 11.0548Z",
      index: 6,
    },
    {
      d: "M490.955 11.0548C490.955 9.02503 491.644 7.32146 493.021 5.9441C494.471 4.49425 496.211 3.76933 498.241 3.76933H561.527C563.556 3.76933 565.296 4.458 566.746 5.83536C568.123 7.28521 568.812 9.02503 568.812 11.0548C568.812 13.0846 568.087 14.8244 566.637 16.2743C565.26 17.6516 563.556 18.3403 561.527 18.3403H537.278V62.3795C536.843 66.729 534.451 69.085 530.101 69.4475C528.071 69.4475 526.295 68.7951 524.773 67.4902C523.323 66.1128 522.598 64.4093 522.598 62.3795V18.3403H498.241C496.211 18.3403 494.507 17.6154 493.13 16.1655C491.68 14.7882 490.955 13.0846 490.955 11.0548Z",
      index: 7,
    },
    {
      d: "M649.279 35.4123C649.279 37.4421 648.554 39.1456 647.104 40.523C645.727 41.9729 644.023 42.6978 641.993 42.6978H609.154C607.124 42.6978 605.385 42.0091 603.935 40.6317C602.557 39.1819 601.869 37.4421 601.869 35.4123C601.869 33.3825 602.557 31.6427 603.935 30.1928C605.385 28.8155 607.124 28.1268 609.154 28.1268H641.993C644.023 28.1268 645.727 28.8517 647.104 30.3016C648.554 31.6789 649.279 33.3825 649.279 35.4123Z",
      index: 8,
    },
    {
      d: "M605.457 3.76933H600.455C595.381 4.0593 591.212 6.01659 587.95 9.64121C584.688 13.1933 582.332 17.2529 580.882 21.8199C579.432 26.387 578.707 31.0627 578.707 35.8472C578.707 40.6317 579.396 45.3075 580.773 49.8745C582.223 54.4416 584.579 58.5374 587.841 62.162C591.176 65.7141 595.381 67.6352 600.455 67.9252H602.521H642.428C644.386 67.8527 646.017 67.164 647.322 65.8591C648.699 64.4818 649.424 62.8144 649.496 60.8571C649.496 58.8274 648.808 57.0875 647.43 55.6377C646.125 54.1878 644.458 53.4267 642.428 53.3542H604.152C601.398 53.2092 599.114 52.158 597.302 50.2007C595.489 48.2435 594.148 46.0324 593.278 43.5677C592.481 41.0305 592.082 38.457 592.082 35.8472C592.082 33.2375 592.481 30.7003 593.278 28.2355C594.148 25.6983 595.489 23.451 597.302 21.4937C599.114 19.5364 601.398 18.4853 604.152 18.3403H642.428C646.778 17.9778 649.134 15.6218 649.496 11.2723C649.496 9.24251 648.808 7.50269 647.43 6.05284C646.125 4.60299 644.458 3.84182 642.428 3.76933H605.457Z",
      index: 9,
    },
  ];

  const dots = [
    // main dot
    {
      d: "M693.608 43.4955C693.608 35.4882 700.099 28.997 708.106 28.997C716.114 28.997 722.605 35.4882 722.605 43.4955C722.605 51.5028 716.114 57.994 708.106 57.994C700.099 57.994 693.608 51.5028 693.608 43.4955Z",
      delay: 2.5,
      springConfig: { stiffness: 300, damping: 20, mass: 2 },
    },
    // left-hand dot
    {
      d: "M677.37 63.2134C677.37 60.3308 679.706 57.994 682.589 57.994C685.472 57.994 687.809 60.3308 687.809 63.2134C687.809 66.0961 685.472 68.4329 682.589 68.4329C679.706 68.4329 677.37 66.0961 677.37 63.2134Z",
      delay: 2.7,
      springConfig: { stiffness: 250, damping: 15, mass: 1.5 },
    },
    // right-hand top dot
    {
      d: "M724.925 12.1787C724.925 9.29611 727.262 6.95928 730.144 6.95928C733.027 6.95928 735.364 9.29611 735.364 12.1787C735.364 15.0614 733.027 17.3982 730.144 17.3982C727.262 17.3982 724.925 15.0614 724.925 12.1787Z",
      delay: 2.9,
      springConfig: { stiffness: 200, damping: 10, mass: 1 },
    },
    // right-hand bottom dot
    {
      d: "M729.564 52.1946C729.564 48.3511 732.68 45.2353 736.523 45.2353C740.367 45.2353 743.483 48.3511 743.483 52.1946C743.483 56.0381 740.367 59.1539 736.523 59.1539C732.68 59.1539 729.564 56.0381 729.564 52.1946Z",
      delay: 3.1,
      springConfig: { stiffness: 150, damping: 5, mass: 0.5 },
    },
    // farthest dot
    {
      d: "M763.201 2.8997C763.201 1.29824 764.499 0 766.1 0C767.702 0 769 1.29824 769 2.8997C769 4.50116 767.702 5.7994 766.1 5.7994C764.499 5.7994 763.201 4.50116 763.201 2.8997Z",
      delay: 3.3,
      springConfig: { stiffness: 210, damping: 5, mass: 1 },
    },
  ];

  // Animation variants for letters
  const pathVariants = {
    hidden: {
      pathLength: 0,
      fill: "rgba(0, 0, 0, 0)",
      y: 10,
    },
    visible: (i: number) => ({
      pathLength: 1,
      fill: "rgba(0, 0, 0, 1)",
      y: [10, -3, 0],
      transition: {
        pathLength: {
          duration: 0.5,
          ease: [0.87, 0, 0.13, 1],
          delay: i * 0.1, // Stagger the letters
        },
        fill: {
          duration: 0.5,
          ease: [1, 0, 0.8, 1],
          delay: i * 0.1 + 0.5, // Fill after stroke completes
        },
        y: {
          duration: 0.5,
          ease: "easeInOut",
          delay: i * 0.1, // Stagger the letters
        },
      },
    }),
  };

  // Animation variants for dots with configurable spring
  const dotVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      x: -30,
    },
    visible: (springConfig: any) => ({
      scale: 1,
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        delay: 2,
        ...springConfig,
      },
    }),
  };

  return (
    <>
      <div className="hidden">
        <AudioController />
      </div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[15%] nico text-[1rem] text-center cursor-pointer"
      >
        press or click to start
      </motion.h1>

      <motion.svg
        width="769"
        height="70"
        viewBox="0 0 769 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={"bg-transparent p-4"}
        style={{ scale: 2, border: "none", outline: "none" }}
        whileHover={{ scale: 2.1 }}
        whileTap={{ scale: 1.9 }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Animate letter paths */}
        {letterPaths.map((letter) => (
          <motion.path
            key={letter.index}
            d={letter.d}
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            custom={letter.index}
            stroke="black"
            strokeWidth="1"
          />
        ))}

        {/* Animate dots */}
        {dots.map((dot, index) => (
          <motion.path
            key={index}
            d={dot.d}
            variants={dotVariants}
            initial="hidden"
            animate="visible"
            custom={dot.springConfig}
            transition={{ delay: dot.delay }}
            fill="black"
          />
        ))}
      </motion.svg>
    </>
  );
};

export default TitleContent;
