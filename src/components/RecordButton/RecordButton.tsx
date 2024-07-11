type RecordButton = {
  isRecording: boolean;
  onClick: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
};

function RecordButton({
  isRecording,
  onClick,
  isLoading = false,
  isDisabled,
}: RecordButton) {
  const isRecordingClass = isRecording ? "bg-red-700" : "bg-red-500";
  const isDisabledClass = isDisabled ? "bg-gray-400" : "cursor-pointer";

  return (
    <section className="grid place-content-center py-8 text-center">
      <button
        className={`h-64 w-64 rounded-full border-8 border-neutral-600 ${isRecordingClass} ${isDisabledClass} transition-col`}
        disabled={isDisabled}
        onClick={onClick}
      />
      {isLoading && <div className="loader">Cargando...</div>}
    </section>
  );
}

export default RecordButton;
