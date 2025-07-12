export default function MyButton({ bType, bKey, bText, bOnClick }) {
  return (
    <button
      type={bType}
      key={bKey}
      onClick={bOnClick}
      className="bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-violet-500 active:bg-violet-700 m-1 px-4 py-2 w-fit rounded text-white"
    >
      {bText}
    </button>
  );
}
