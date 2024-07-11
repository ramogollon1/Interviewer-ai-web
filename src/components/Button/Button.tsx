type ButtonType = {
  onClick: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  text: string;
};

function Button({ onClick, isDisabled, text }: ButtonType) {
  const isDisabledClass = `${isDisabled ? "bg-gray-400" : "cursor-pointer"}`;

  return (
    <button
      className={`${isDisabledClass} red rounded border border-gray-400 px-4 py-2`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
