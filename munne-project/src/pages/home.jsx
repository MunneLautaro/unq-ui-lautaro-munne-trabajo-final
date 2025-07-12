import { useEffect, useState } from "react";
import {
  getDifficults,
  getGameSessionByDifficultyId,
  checkWord,
} from "../services/gameServices";
import MyButton from "../component/UI/MyButton";
import Grid from "../component/Grid/Grid";
import Form from "../component/Form/Form";

export default function Home() {
  const [dificulties, setDificulties] = useState([]);
  const [session, setSession] = useState(null);
  const [word, setWord] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [wordLenght, setWordLenght] = useState(5);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!word || !session) return;

    setGuesses((prevGuesses) => [...prevGuesses, word]);

    checkWord({ sessionId: session, word })
      .then((res) => {
        console.log("Respuesta de la API:", res);
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    setWord("");
  };

  useEffect(() => {
    getDifficults()
      .then((res) => setDificulties(res))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    console.log(dificulties);
    console.log({ session });
  }, [dificulties, session]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-center items-center flex-col">
          <div className="flex">
            {dificulties.map((dif) => (
              <div className="flex items-center" key={dif.id}>
                <MyButton
                  bKey={dif.id}
                  bOnClick={() => {
                    getGameSessionByDifficultyId(dif.id).then((session) => {
                      setSession(session.sessionId);
                      setWordLenght(session.wordLenght);
                      console.log(session);
                    });
                    console.log(session);
                  }}
                  bText={dif.name}
                />
              </div>
            ))}
          </div>
          <Grid guesses={guesses} cols={wordLenght} currentWord={word} />
          <Form onSubmit={onSubmit} word={word} setWord={setWord} />
        </div>
      </div>
    </>
  );
}
/*
<form className="flex flex-col items-center" onSubmit={onSubmit}>
            <input
              className="bg-black text-white"
              placeholder="palabra"
              onChange={(e) => {
                setWord(e.target.value);
              }}
            />

            <MyButton bType={"submit"} bText={"Responder"} />
          </form>
*/
