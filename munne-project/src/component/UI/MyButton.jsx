export default function MyButton({
  bType,
  bKey,
  bText,
  bOnClick,
  disabled = false,
}) {
  return (
    <button
      type={bType}
      key={bKey}
      onClick={bOnClick}
      disabled={disabled}
      className={`bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-violet-500 active:bg-violet-700 m-1 px-4 py-2 w-fit rounded text-white
        ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
    >
      {bText}
    </button>
  );
}
