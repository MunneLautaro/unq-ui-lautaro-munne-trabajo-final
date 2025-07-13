import DifficultySelector from "../component/DifficultySelector/DifficultySelector";
import Form from "../component/Form/Form";
import Grid from "../component/Grid/Grid";
import GameResult from "../component/GameResult/GameResult";
import Loader from "../component/Loader/Loader";

import { getDifficults, checkWord } from "../services/gameServices";

import { ToastContainer, toast } from "react-toastify";

import { useEffect, useState } from "react";

import { validateWord, restartGame } from "../utilities/index";

export default function Home() {
  const [dificulties, setDificulties] = useState([]);
  const [session, setSession] = useState(null);
  const [word, setWord] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [wordLenght, setWordLenght] = useState(4);
  const [isWinner, setIsWinner] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        setGuesses((prevGuesses) => {
          const updated = [...prevGuesses, res];

          const won = res.every(
            (letterObj) => letterObj.solution === "correct"
          );
          if (won) {
            setIsWinner(true);
            setIsGameOver(true);
          } else if (updated.length >= 6) {
            setIsGameOver(true);
          }

          return updated;
        });
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
    getDifficults()
      .then((res) => setDificulties(res))
      .catch((error) => toast.error(error));
  }, []);

  useEffect(() => {
    setGuesses([]);
    setWord("");
    setIsWinner(false);
    setIsGameOver(false);
  }, [session]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-center items-center flex-col">
          <div className="flex">
            <DifficultySelector
              difficulties={dificulties}
              setSession={setSession}
              setWordLenght={setWordLenght}
            />
          </div>
          <Grid guesses={guesses} cols={wordLenght} currentWord={word} />

          {!session ? (
            <p className="text-violet-500 font-bold text-xl mt-4 underline">
              Select a difficulty to play!
            </p>
          ) : !isGameOver ? (
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
              isWinner={isWinner}
              onRestart={() => {
                restartGame({
                  setSession,
                  setGuesses,
                  setWord,
                  setIsWinner,
                  setIsGameOver,
                });
              }}
            />
          )}
        </div>
      </div>
      <ToastContainer theme="dark" />
    </>
  );
}
