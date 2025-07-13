import MyButton from "../UI/MyButton";

export default function GameResult({ isWinner, onRestart }) {
  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <p
        className={`font-bold text-xl ${
          isWinner ? "text-green-500" : "text-red-500"
        }`}
      >
        {isWinner ? "You won!" : "You lost!"}
      </p>
      <MyButton bOnClick={onRestart} bText={"Play again"} />
    </div>
  );
}
