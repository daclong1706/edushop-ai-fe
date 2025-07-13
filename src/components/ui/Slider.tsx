import React from "react";
import clsx from "clsx";

type SliderProps = {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  unit?: string; // Đơn vị hiển thị giờ, đồng, v.v.
  className?: string;
};

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  unit = "",
  className = "",
}) => {
  const [minVal, maxVal] = value;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = Math.min(Number(e.target.value), maxVal - step);
    onChange([newVal, maxVal]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = Math.max(Number(e.target.value), minVal + step);
    onChange([minVal, newVal]);
  };

  return (
    <div className={clsx("w-full", className)}>
      <div className="flex justify-between text-sm mb-1 text-gray-700 dark:text-gray-300">
        <span>
          {minVal.toLocaleString()} {unit}
        </span>
        <span>
          {maxVal.toLocaleString()} {unit}
        </span>
      </div>

      <div className="relative h-6">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={handleMinChange}
          className="absolute w-full h-1 bg-transparent pointer-events-none accent-primary"
          style={{ zIndex: minVal < max - 100 ? 2 : 1 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={handleMaxChange}
          className="absolute w-full h-1 bg-transparent pointer-events-none accent-primary"
        />
        <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded relative">
          <div
            className="h-full bg-primary rounded absolute"
            style={{
              left: `${((minVal - min) / (max - min)) * 100}%`,
              width: `${((maxVal - minVal) / (max - min)) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
