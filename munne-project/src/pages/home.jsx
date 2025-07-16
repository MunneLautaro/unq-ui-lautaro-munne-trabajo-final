import DifficultySelector from "../component/DifficultySelector/DifficultySelector";
import Form from "../component/Form/Form";
import Grid from "../component/Grid/Grid";
import Loader from "../component/Loader/Loader";
import GameResult from "../component/GameResult/GameResult";

import {
  getDifficults,
  checkWord,
  getGameSessionByDifficultyId,
} from "../services/gameServices";

import { ToastContainer, toast } from "react-toastify";

import { useEffect, useState } from "react";

import { validateWord, restartGame } from "../utilities/index";

export default function Home() {
  const [dificulties, setDificulties] = useState([]);
  const [session, setSession] = useState(null);
  const [word, setWord] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [wordLenght, setWordLenght] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDifficult, setCurrentDifficult] = useState(1);

  useEffect(() => {
    getDifficults()
      .then((res) => {
        setDificulties(res);
      })
      .catch((error) => toast.error(error));

    getGameSessionByDifficultyId(currentDifficult)
      .then((session) => {
        setSession(session.sessionId);
        setWordLenght(session.wordLenght);
      })
      .catch((error) => {
        toast(`Dificulty selector error: ${error}`);
      });
  }, [currentDifficult]);

  const onSubmit = (e) => {
    e.preventDefault();

    const errorMsg = validateWord({ word, wordLenght, session });
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }

    setIsLoading(true);

    checkWord({ sessionId: session, word })
      .then((res) => {
        setGuesses((prevGuesses) => [...prevGuesses, res]);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    setWord("");
  };

  useEffect(() => {
    setGuesses([]);
    setWord("");
  }, [session]);

  const hasWon =
    guesses.length > 0 &&
    guesses[guesses.length - 1].every(
      (letter) => letter.solution === "correct"
    );

  const hasAttemptsLeft = guesses.length < 6;

  return (
    <>
      <div className="flex flex-col items-center px-4 py-6 min-h-screen">
        <div className="w-full max-w-[600px] flex flex-col items-center gap-4">
          <DifficultySelector
            difficulties={dificulties}
            setSession={setSession}
            setWordLenght={setWordLenght}
            setCurrentDifficult={setCurrentDifficult}
            isLoading={isLoading}
          />

          <Grid guesses={guesses} cols={wordLenght} currentWord={word} />

          {hasWon ? (
            <GameResult
              message="You won!"
              isWin={true}
              onRestart={() =>
                restartGame({
                  setSession,
                  setGuesses,
                  setWord,
                  currentDifficult,
                  setWordLenght,
                })
              }
            />
          ) : hasAttemptsLeft ? (
            isLoading ? (
              <Loader />
            ) : (
              <Form
                onSubmit={onSubmit}
                word={word}
                setWord={setWord}
                wordLength={wordLenght}
              />
            )
          ) : (
            <GameResult
              message="You Lost!"
              isWin={false}
              onRestart={() =>
                restartGame({
                  setSession,
                  setGuesses,
                  setWord,
                  currentDifficult,
                  setWordLenght,
                })
              }
            />
          )}
        </div>
      </div>

      <ToastContainer theme="dark" />
    </>
  );
}
