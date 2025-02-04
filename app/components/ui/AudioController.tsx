"use client";
import React, { useState, useEffect, useRef } from "react";
import useGameStore from "../../store/gameStore";

type Props = {
  fillColor?: string;
  fillOpacity?: number;
};
const AudioController = ({
  fillColor = "black",
  fillOpacity = 0.25,
}: Props) => {
  const { gameState } = useGameStore();
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("are_you_the_one.mp3");

  useEffect(() => {
    switch (gameState) {
      case "title":
        setCurrentTrack("are_you_the_one.mp3");
        break;
      case "cutscene":
        setCurrentTrack("monochrome_world.mp3");
        break;
      case "playing":
        setCurrentTrack("competent_color_coordinator_fixer_upper.mp3");
        break;
      case "gameOver":
        setCurrentTrack("over_already.mp3");
        break;
      default:
        setCurrentTrack("are_you_the_one.mp3");
        break;
    }
  }, [gameState]);

  return (
    <div onClick={() => setIsMuted(!isMuted)}>
      {currentTrack && (
        <audio
          autoPlay
          loop
          playsInline
          muted={isMuted}
          className="hidden"
          src={`/audio/${currentTrack}`}
        />
      )}
      {!isMuted ? (
        <svg
          className="cursor-pointer"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 16.0001H5.88889L11.1834 20.3319C11.2727 20.405 11.3846 20.4449 11.5 20.4449C11.7761 20.4449 12 20.2211 12 19.9449V4.05519C12 3.93977 11.9601 3.8279 11.887 3.73857C11.7121 3.52485 11.3971 3.49335 11.1834 3.66821L5.88889 8.00007H2C1.44772 8.00007 1 8.44778 1 9.00007V15.0001C1 15.5524 1.44772 16.0001 2 16.0001ZM23 12C23 15.292 21.5539 18.2463 19.2622 20.2622L17.8445 18.8444C19.7758 17.1937 21 14.7398 21 12C21 9.26016 19.7758 6.80629 17.8445 5.15557L19.2622 3.73779C21.5539 5.75368 23 8.70795 23 12ZM18 12C18 10.0883 17.106 8.38548 15.7133 7.28673L14.2842 8.71584C15.3213 9.43855 16 10.64 16 12C16 13.36 15.3213 14.5614 14.2842 15.2841L15.7133 16.7132C17.106 15.6145 18 13.9116 18 12Z"
            fill={fillColor}
            fillOpacity={fillOpacity}
          />
        </svg>
      ) : (
        <svg
          className="cursor-pointer"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.379 3.3282L20.6719 2.62109L19.4167 3.87628L18.0007 5.29224L15.8745 7.41848L14.4529 8.84007L12 11.293V12.7072L15.16 9.5472L16.5816 8.1256L18.7078 5.99935L20.1238 4.58339L21.379 3.3282ZM7.43891 17.2683L6.66108 16.6319L1.49097 21.802L2.19807 22.5091L7.43891 17.2683ZM5.88889 16.0001H2C1.44772 16.0001 1 15.5524 1 15.0001V9.00007C1 8.44778 1.44772 8.00007 2 8.00007H5.88889L11.1834 3.66821C11.3971 3.49335 11.7121 3.52485 11.887 3.73857C11.9601 3.8279 12 3.93977 12 4.05519V11L6.53679 16.5302L5.88889 16.0001ZM7.57143 17.3767L11.1834 20.3319C11.2727 20.405 11.3846 20.4449 11.5 20.4449C11.7761 20.4449 12 20.2211 12 19.9449V12.941L7.57143 17.3767ZM19.2622 20.2622C21.5539 18.2463 23 15.292 23 12C23 9.19848 21.9527 6.64158 20.2283 4.69944L18.8121 6.11792C20.1754 7.69539 21 9.75139 21 12C21 14.7398 19.7758 17.1937 17.8445 18.8444L19.2622 20.2622ZM16.6838 8.24966C17.5074 9.2769 18 10.5809 18 12C18 13.9116 17.106 15.6145 15.7133 16.7132L14.2842 15.2841C15.3213 14.5614 16 13.36 16 12C16 11.1343 15.725 10.3328 15.2576 9.67818L16.6838 8.24966Z"
            fill={fillColor}
            fillOpacity={fillOpacity}
          />
          <path
            d="M12 11.293L6.66108 16.6319L7.43891 17.2683L12 12.7072V11.293Z"
            fill={fillColor}
            fillOpacity={fillOpacity}
          />
        </svg>
      )}
    </div>
  );
};

export default AudioController;
