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
      (rawAngle: number): number => {
        let angle = rawAngle;
        // Convert negative angles to positive
        if (angle < 0) {
          angle += 360;
        }
        angle = angle % 360;

        // For an arc from 135° to 405°, the valid raw-angle regions are:
        // - [135, 360] which maps directly,
        // - [0, 45] which maps to [360, 405] (by adding 360)
        const effectiveEnd = endAngle - 360; // For 405, effectiveEnd = 45

        if (angle >= startAngle && angle <= 360) {
          // The pointer is in the "upper" part of the circle.
          return angle;
        } else if (angle >= 0 && angle <= effectiveEnd) {
          // The pointer is in the lower wrapped part; map it above 360.
          return angle + 360;
        } else {
          // The pointer is in the gap between 45° and 135° (i.e. outside the arc).
          // Compute distances to the two valid boundaries:
          const distToStart = startAngle - angle; // distance to 135°
          const distToEnd = angle + 360 - endAngle; // distance to 405°
          return distToStart < distToEnd ? startAngle : endAngle;
        }
      },
      [startAngle, endAngle]
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

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        // if (isDragging.current) return; // Ignore if we're dragging

        const rect = sliderRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left - centerX * (rect.width / size);
        const y = e.clientY - rect.top - centerY * (rect.height / size);

        // Calculate distance from center to check if click is near the path
        const distanceFromCenter = Math.sqrt(x * x + y * y);
        const tolerance = 10; // pixels of tolerance around the path

        if (Math.abs(distanceFromCenter - radius) <= tolerance) {
          const angle = Math.atan2(y, x) * (180 / Math.PI);
          const normalizedAngle = normalizeAngle(angle);
          const newValue = angleToValue(normalizedAngle);

          if (!isNaN(newValue) && isFinite(newValue)) {
            onChange(newValue);
          }
        }
      },
      [radius, centerX, centerY, size, angleToValue, normalizeAngle, onChange]
    );

    const handlePointerMove = useCallback(
      (e: PointerEvent) => {
        if (!isDragging.current || !sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - centerX * (rect.width / size);
        const y = e.clientY - rect.top - centerY * (rect.height / size);
        const rawAngle = Math.atan2(y, x) * (180 / Math.PI);

        const normalizedAngle = normalizeAngle(rawAngle);
        const newValue = angleToValue(normalizedAngle);

        // Clamp the final value
        const clampedValue = Math.max(0, Math.min(255, newValue));

        if (!isNaN(clampedValue) && isFinite(clampedValue)) {
          onChange(clampedValue);
        }
      },
      [angleToValue, centerX, centerY, normalizeAngle, onChange, size]
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
        // onClick={handleClick}
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
