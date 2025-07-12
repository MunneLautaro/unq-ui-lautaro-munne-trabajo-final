export default function Grid({ guesses, cols, currentWord }) {
  const rows = 6;
  const currentGuesses = [...guesses];

  // Si hay espacio, agregá la palabra que se está escribiendo
  if (currentGuesses.length < rows) {
    currentGuesses.push(
      currentWord.split("").map((letter) => ({ letter, solution: null }))
    );
  }

  return (
    <div className="flex flex-col items-center gap-[5px] p-[10px]">
      {Array.from({ length: rows }).map((_, rowIndex) => {
        const row = currentGuesses[rowIndex] || [];

        return (
          <div key={rowIndex} className="flex gap-[5px]">
            {Array.from({ length: cols }).map((_, colIndex) => {
              const cell = row[colIndex] || { letter: "", solution: null };
              const { letter, solution } = cell;

              let bgColor = "bg-neutral-800";
              if (solution === "correct") bgColor = "bg-green-500";
              else if (solution === "elsewhere") bgColor = "bg-yellow-400";
              else if (solution === "absent") bgColor = "bg-gray-600";

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`flex justify-center items-center w-[60px] h-[60px] border-gray-500 border-2 text-lg font-bold uppercase text-white ${bgColor}`}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

/*

*/

/*
export default function Grid({ guesses, cols, currentWord }) {
  const rows = 6;
  const currentGuesses = [...guesses];

  if (currentGuesses.length < rows) {
    currentGuesses.push(currentWord);
  }

  return (
    <div className="flex flex-col items-center gap-[5px] p-[10px]">
      {Array(rows)
        .fill()
        .map((_, rowIndex) => {
          return (
            <div key={rowIndex} className="flex gap-[5px]">
              {Array(cols)
                .fill()
                .map((_, colIndex) => {
                  const letter = currentGuesses[rowIndex]?.[colIndex] || "";
                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="flex justify-center items-center w-[60px] h-[60px] border-gray-500 border-2 text-lg font-bold uppercase text-white"
                    >
                      {letter}
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
*/
