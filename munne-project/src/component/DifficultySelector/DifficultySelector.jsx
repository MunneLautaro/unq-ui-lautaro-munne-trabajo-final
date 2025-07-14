import MyButton from "../UI/MyButton";
import { getGameSessionByDifficultyId } from "../../services/gameServices";
import { toast } from "react-toastify";

export default function DifficultySelector({
  difficulties,
  setSession,
  setWordLenght,
  setCurrentDifficult,
  isLoading,
}) {
  const handleClick = (difId) => {
    setCurrentDifficult(difId);
    getGameSessionByDifficultyId(difId)
      .then((session) => {
        setSession(session.sessionId);
        setWordLenght(session.wordLenght);
      })
      .catch((error) => {
        toast(`Dificulty selector error: ${error}`);
      });
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-wrap justify-center">
        {difficulties.map((dif) => (
          <div className="flex items-center" key={dif.id}>
            <MyButton
              bKey={dif.id}
              bOnClick={() => handleClick(dif.id)}
              bText={dif.name}
              disabled={isLoading}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
