import MyButton from "../UI/MyButton";

export default function Form({ onSubmit, word, setWord, maxLength }) {
  return (
    <form className="flex flex-col items-center" onSubmit={onSubmit}>
      <input
        className="border-white border-1 rounded-full focus:outline focus:outline-violet-500 p-3 text-white placeholder-violet-500 mb-2"
        placeholder="Word..."
        value={word}
        onChange={(e) => setWord(e.target.value.toLocaleLowerCase())}
        maxLength={maxLength}
      />
      <MyButton bType="submit" bText="Answer" />
    </form>
  );
}
