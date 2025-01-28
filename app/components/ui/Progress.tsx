import React from "react";

interface ProgressProps {
  value: number;
  className?: string;
  color?: string;
  orientation?: "horizontal" | "vertical";
}

const Progress = ({
  value,
  className = "",
  color = "rgba(0, 0, 0, 0.5)",
  orientation = "horizontal",
}: ProgressProps) => {
  return (
    <>
      {orientation === "horizontal" ? (
        <div className={`w-full h-2 bg-gray-300 rounded-full ${className}`}>
          <div
            className={`h-full rounded-full transition-all duration-300`}
            style={{
              width: `${Math.min(100, Math.max(0, value))}%`,
              backgroundColor: color,
            }}
          />
        </div>
      ) : (
        <div className={`w-2 h-full bg-gray-300 rounded-full ${className}`}>
          <div
            className={`w-full rounded-full transition-all duration-300`}
            style={{
              height: `${Math.min(100, Math.max(0, value))}%`,
              backgroundColor: color,
            }}
          />
        </div>
      )}
    </>
  );
};

export default Progress;
