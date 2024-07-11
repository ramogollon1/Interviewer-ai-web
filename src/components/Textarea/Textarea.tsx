import { ChangeEvent } from "react";

type Textarea = {
  className?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  isDisabled?: boolean;
};

function Dropdown({
  className,
  value = "",
  onChange,
  rows = 5,
  isDisabled,
}: Textarea) {
  const isDisabledClass = isDisabled ? "bg-gray-400" : "cursor-pointer";

  return (
    <textarea
      className={`${className} ${isDisabledClass} mb-4 mt-12 w-full border border-gray-400 p-2`}
      disabled={isDisabled}
      rows={rows}
      value={value}
      onChange={onChange}
    />
  );
}

export default Dropdown;
