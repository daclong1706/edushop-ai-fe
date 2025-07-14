import React from "react";
import clsx from "clsx";

type SliderProps = {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  unit?: string;
  className?: string;
};

const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  unit = "",
  className = "",
}) => {
  const [minVal, maxVal] = value;

  const getPercent = (val: number) => ((val - min) / (max - min)) * 100;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), maxVal - step);
    onChange([val, maxVal]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), minVal + step);
    onChange([minVal, val]);
  };

  return (
    <div className={clsx("w-full", className)}>
      <div className="flex justify-between text-sm mb-2 text-gray-700 dark:text-gray-300">
        <span>
          {minVal.toLocaleString()} {unit}
        </span>
        <span>
          {maxVal.toLocaleString()} {unit}
        </span>
      </div>

      <div className="relative h-6">
        {/* Đường ray nền */}
        <div className="absolute top-1/2 -translate-y-1/2 h-1 w-full bg-gray-300 dark:bg-gray-600 rounded" />

        {/* Đường ray vùng được chọn */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1 bg-primary rounded"
          style={{
            left: `${getPercent(minVal)}%`,
            width: `${getPercent(maxVal) - getPercent(minVal)}%`,
          }}
        />

        {/* Handle bên trái */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={handleMinChange}
          className="absolute w-full top-0 left-0 h-6 bg-transparent appearance-none z-50"
          style={{ pointerEvents: "auto" }}
        />

        {/* Handle bên phải */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={handleMaxChange}
          className="absolute w-full top-0 left-0 h-6 bg-transparent appearance-none z-40"
          style={{ pointerEvents: "auto" }}
        />
      </div>
    </div>
  );
};

export default Slider;
