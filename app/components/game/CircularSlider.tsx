import React, { useRef, useEffect } from "react";
import { RGB } from "@/app/types";

interface Coordinate {
  x: number;
  y: number;
}

interface CircularSliderProps {
  value: number;
  onChange: (value: number) => void;
  color: string;
  radius: number;
  size: number;
  channel: keyof RGB;
  setActiveChannel: (channel: keyof RGB | null) => void;
}

export const CircularSlider: React.FC<CircularSliderProps> = ({
  value,
  onChange,
  color,
  radius,
  size,
  channel,
  setActiveChannel,
}) => {
  const sliderRef = useRef<SVGGElement>(null);
  const isDragging = useRef<boolean>(false);
  const lastValidValue = useRef<number>(value);

  const centerX = size / 2;
  const centerY = size / 2;
  const startAngle = 135;
  const endAngle = 405;
  const totalAngle = endAngle - startAngle;

  const angleToCoordinate = (angle: number): Coordinate => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(radian),
      y: centerY + radius * Math.sin(radian),
    };
  };

  const valueToAngle = (value: number): number => {
    return startAngle + (value / 255) * totalAngle;
  };

  const normalizeAngle = (angle: number): number => {
    angle = angle % 360;
    if (angle < 0) angle += 360;
    if (angle < startAngle) angle += 360;
    return angle;
  };

  const angleToValue = (angle: number): number => {
    const normalizedAngle = normalizeAngle(angle);
    let percentage;

    if (normalizedAngle > endAngle) {
      percentage = 1;
    } else if (normalizedAngle < startAngle) {
      percentage = 0;
    } else {
      percentage = (normalizedAngle - startAngle) / totalAngle;
    }

    percentage = Math.max(0, Math.min(1, percentage));
    return Math.round(percentage * 255);
  };

  const getAngleFromMouse = (e: MouseEvent): number => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - centerX * (rect.width / size);
    const y = e.clientY - rect.top - centerY * (rect.height / size);
    return Math.atan2(y, x) * (180 / Math.PI);
  };

  const handleMouseDown = (): void => {
    isDragging.current = true;
    setActiveChannel(channel);
  };

  const handleMouseUp = (): void => {
    isDragging.current = false;
    setActiveChannel(null);
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (!isDragging.current) return;
    const angle = getAngleFromMouse(e);
    const newValue = angleToValue(angle);
    if (!isNaN(newValue) && isFinite(newValue)) {
      lastValidValue.current = newValue;
      onChange(newValue);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const currentAngle = valueToAngle(value);
  const end = angleToCoordinate(currentAngle);

  const createArcPath = (startAngle: number, endAngle: number): string => {
    const start = angleToCoordinate(startAngle);
    const end = angleToCoordinate(endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      1,
      end.x,
      end.y,
    ].join(" ");
  };

  return (
    <g className="p-8" ref={sliderRef} onMouseDown={handleMouseDown}>
      <path
        d={createArcPath(startAngle, endAngle)}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d={createArcPath(startAngle, currentAngle)}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle
        cx={end.x}
        cy={end.y}
        r="8"
        fill={channel === "r" ? "red" : channel === "g" ? "green" : "blue"}
        stroke="#F8F8F8"
        strokeWidth="4"
        className="drop-shadow-md cursor-pointer"
      />
    </g>
  );
};
