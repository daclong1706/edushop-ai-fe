import React from "react";
import clsx from "clsx";

export type RadioProps = {
  name: string;
  label: string;
  value: string;
  checkedValue: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

export const Radio: React.FC<RadioProps> = ({
  name,
  label,
  value,
  checkedValue,
  onChange,
  disabled = false,
  className = "",
}) => {
  return (
    <label
      className={clsx(
        "flex items-center gap-2 text-sm cursor-pointer select-none",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checkedValue === value}
        onChange={() => onChange(value)}
        disabled={disabled}
        className="accent-primary w-4 h-4"
      />
      <span>{label}</span>
    </label>
  );
};
