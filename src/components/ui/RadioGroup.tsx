import React from "react";
import clsx from "clsx";
import { Radio } from "./Radio";

type RadioGroupProps = {
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className={clsx("space-y-2", className)}>
      {options.map((option) => (
        <Radio
          key={option}
          name={name}
          label={option}
          value={option}
          checkedValue={value}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
