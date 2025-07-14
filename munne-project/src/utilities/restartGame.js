import { getGameSessionByDifficultyId } from "../services/gameServices";

import { toast } from "react-toastify";

export const restartGame = ({
  setSession,
  setGuesses,
  setWord,
  currentDifficult,
  setWordLenght,
}) => {
  setGuesses([]);
  setWord("");
  getGameSessionByDifficultyId(currentDifficult)
    .then((session) => {
      setSession(session.sessionId);
      setWordLenght(session.wordLenght);
    })
    .catch((error) => {
      toast(`Dificulty selector error: ${error}`);
    });
};
