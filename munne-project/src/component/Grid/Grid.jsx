export default function Grid({ guesses, cols, currentWord }) {
  const rows = 6;
  const currentGuesses = [...guesses];

  if (currentGuesses.length < rows) {
    currentGuesses.push(currentWord); // solo una palabra en progreso
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
}
