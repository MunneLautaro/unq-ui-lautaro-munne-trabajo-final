export const restartGame = ({
  setSession,
  setGuesses,
  setWord,
  setIsWinner,
  setIsGameOver,
}) => {
  setSession(null);
  setGuesses([]);
  setWord("");
  setIsWinner(false);
  setIsGameOver(false);
};
