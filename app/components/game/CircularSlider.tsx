import React, { useRef, useEffect, useCallback, useMemo } from "react";
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

// Memoized path generator
const ArcPath = React.memo(
  ({
    startAngle,
    endAngle,
    radius,
    centerX,
    centerY,
    color,
    strokeWidth,
  }: {
    startAngle: number;
    endAngle: number;
    radius: number;
    centerX: number;
    centerY: number;
    color: string;
    strokeWidth: number;
  }) => {
    const createArcPath = useCallback(
      (start: number, end: number): string => {
        const getCoordinate = (angle: number): Coordinate => ({
          x: centerX + radius * Math.cos((angle * Math.PI) / 180),
          y: centerY + radius * Math.sin((angle * Math.PI) / 180),
        });

        const startPoint = getCoordinate(start);
        const endPoint = getCoordinate(end);
        const largeArcFlag = end - start <= 180 ? "0" : "1";

        return [
          "M",
          startPoint.x,
          startPoint.y,
          "A",
          radius,
          radius,
          0,
          largeArcFlag,
          1,
          endPoint.x,
          endPoint.y,
        ].join(" ");
      },
      [radius, centerX, centerY]
    );

    const pathData = useMemo(
      () => createArcPath(startAngle, endAngle),
      [createArcPath, startAngle, endAngle]
    );

    return (
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    );
  }
);

ArcPath.displayName = "ArcPath";

// Memoized slider handle
const SliderHandle = React.memo(
  ({ x, y, channel }: { x: number; y: number; channel: keyof RGB }) => (
    <circle
      cx={x}
      cy={y}
      r="8"
      fill={channel === "r" ? "red" : channel === "g" ? "green" : "blue"}
      stroke="#F8F8F8"
      strokeWidth="4"
      className="drop-shadow-md cursor-pointer"
    />
  )
);

SliderHandle.displayName = "SliderHandle";

export const CircularSlider = React.memo(
  ({
    value,
    onChange,
    color,
    radius,
    size,
    channel,
    setActiveChannel,
  }: CircularSliderProps) => {
    const sliderRef = useRef<SVGGElement>(null);
    const isDragging = useRef<boolean>(false);
    const lastValidValue = useRef<number>(value);

    const centerX = size / 2;
    const centerY = size / 2;
    const startAngle = 135;
    const endAngle = 405;
    const totalAngle = endAngle - startAngle;

    const valueToAngle = useCallback(
      (val: number): number => startAngle + (val / 255) * totalAngle,
      [startAngle, totalAngle]
    );

    const normalizeAngle = useCallback(
      (angle: number): number => {
        angle = angle % 360;
        if (angle < 0) angle += 360;
        if (angle < startAngle) angle += 360;
        return angle;
      },
      [startAngle]
    );

    const angleToValue = useCallback(
      (angle: number): number => {
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
      },
      [normalizeAngle, startAngle, endAngle, totalAngle]
    );

    const currentAngle = useMemo(
      () => valueToAngle(value),
      [value, valueToAngle]
    );

    const handlePosition = useMemo(
      () => ({
        x: centerX + radius * Math.cos((currentAngle * Math.PI) / 180),
        y: centerY + radius * Math.sin((currentAngle * Math.PI) / 180),
      }),
      [centerX, centerY, radius, currentAngle]
    );

    const handleMouseDown = useCallback(
      (e: React.PointerEvent) => {
        // Only handle left mouse button
        if (e.button !== 0) return;

        isDragging.current = true;
        setActiveChannel(channel);

        // Capture the pointer to ensure we get events even outside the element
        (e.target as Element).setPointerCapture(e.pointerId);
      },
      [channel, setActiveChannel]
    );

    const handleMouseUp = useCallback(
      (e: React.PointerEvent) => {
        if (!isDragging.current) return;

        isDragging.current = false;
        setActiveChannel(null);

        // Release the pointer capture
        (e.target as Element).releasePointerCapture(e.pointerId);
      },
      [setActiveChannel]
    );

    const handlePointerMove = useCallback(
      (e: PointerEvent) => {
        if (!isDragging.current || !sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - centerX * (rect.width / size);
        const y = e.clientY - rect.top - centerY * (rect.height / size);
        const angle = Math.atan2(y, x) * (180 / Math.PI);

        const newValue = angleToValue(angle);
        if (!isNaN(newValue) && isFinite(newValue)) {
          lastValidValue.current = newValue;
          onChange(newValue);
        }
      },
      [angleToValue, centerX, centerY, onChange, size]
    );

    useEffect(() => {
      const currentRef = sliderRef.current;
      if (!currentRef) return;

      currentRef.addEventListener("pointermove", handlePointerMove);

      return () => {
        currentRef.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handlePointerMove]);

    return (
      <g
        className="p-8"
        ref={sliderRef}
        onPointerDown={handleMouseDown}
        onPointerUp={handleMouseUp}
        onPointerLeave={handleMouseUp} // Handle the case where pointer leaves the element
      >
        <ArcPath
          startAngle={startAngle}
          endAngle={endAngle}
          radius={radius}
          centerX={centerX}
          centerY={centerY}
          color="#e5e7eb"
          strokeWidth={2}
        />
        <ArcPath
          startAngle={startAngle}
          endAngle={currentAngle}
          radius={radius}
          centerX={centerX}
          centerY={centerY}
          color={color}
          strokeWidth={4}
        />
        <SliderHandle
          x={handlePosition.x}
          y={handlePosition.y}
          channel={channel}
        />
      </g>
    );
  }
);

CircularSlider.displayName = "CircularSlider";
