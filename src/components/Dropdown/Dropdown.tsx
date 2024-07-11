import { ChangeEvent } from "react";

type Option = {
  value: string;
  label: string;
};

type Dropdown = {
  className?: string;
  title?: string;
  value: string;
  onChange: (e: string) => void;
  options: Option[];
  isDisabled?: boolean;
};

function Dropdown({
  className,
  value = "",
  onChange,
  options = [],
  title,
  isDisabled,
}: Dropdown) {
  const isDisabledClass = isDisabled ? "bg-gray-400" : "cursor-pointer";

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      {title && <label>{title}</label>}
      <select
        className={`${className} ${isDisabledClass} w-full border border-gray-400 p-2`}
        disabled={isDisabled}
        id="prompt-select"
        value={value}
        onChange={handleOnChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}

export default Dropdown;
