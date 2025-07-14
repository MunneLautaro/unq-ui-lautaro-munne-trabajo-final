import MyButton from "../UI/MyButton";

export default function GameResult({ message, isWin, onRestart }) {
  return (
    <>
      <p
        className={`font-bold text-xl ${
          isWin ? "text-green-500" : "text-red-500"
        }`}
      >
        {message}
      </p>
      <MyButton bOnClick={onRestart} bText="Restart" />
    </>
  );
}
