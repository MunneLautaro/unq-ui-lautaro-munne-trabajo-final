export default function Grid({ guesses, cols, currentWord }) {
  const rows = 6;
  const currentGuesses = [...(guesses || [])];

  if (currentGuesses.length < rows) {
    currentGuesses.push(
      currentWord.split("").map((letter) => ({ letter, solution: null }))
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 p-4 overflow-x-auto">
      {Array.from({ length: rows }).map((_, rowIndex) => {
        const row = currentGuesses[rowIndex] || [];

        return (
          <div key={rowIndex} className="flex gap-2 justify-center min-w-fit">
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
                  className={`flex justify-center items-center text-sm sm:text-base font-bold uppercase text-white border-2 border-gray-500
                    w-10 h-10 sm:w-14 sm:h-14 ${bgColor}`}
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
