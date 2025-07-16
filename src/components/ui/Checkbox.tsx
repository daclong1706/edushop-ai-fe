import clsx from "clsx";
import React from "react";
import { MdOutlineCheck } from "react-icons/md";

export type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  count?: number;
  disabled?: boolean;
  className?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  count,
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
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />

      <div
        className={clsx(
          "w-4 h-4 rounded-sm border-2 border-gray-700 flex items-center justify-center transition-colors dark:border-gray-100",
          "peer-checked:bg-primary peer-checked:border-primary",
          disabled && "bg-gray-100 dark:bg-gray-100"
        )}
      >
        <MdOutlineCheck
          className={clsx(
            "w-3 h-3 text-white transition-opacity duration-200",
            checked ? "block" : "hidden"
          )}
        />
      </div>

      <span className="text-gray-700 tracking-wide dark:text-gray-100">
        {label}
      </span>

      {typeof count === "number" && (
        <span className="text-gray-500 dark:text-gray-100 ml-auto text-xs">
          ({count.toLocaleString()})
        </span>
      )}
    </label>
  );
};

export default Checkbox;
