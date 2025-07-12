import MyButton from "../UI/MyButton";
import { getGameSessionByDifficultyId } from "../../services/gameServices";

export default function DifficultySelector({
  difficulties,
  setSession,
  setWordLenght,
}) {
  const handleClick = (difId) => {
    getGameSessionByDifficultyId(difId).then((session) => {
      setSession(session.sessionId);
      setWordLenght(session.wordLenght);
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
            />
          </div>
        ))}
      </div>
    </div>
  );
}
