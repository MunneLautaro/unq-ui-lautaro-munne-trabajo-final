export const validateWord = ({ word, wordLenght, session }) => {
  const isValidSpanishWord = /^[a-zA-ZñÑ]+$/.test(word);

  if (!word) return "You must write a word";

  if (!session) return "Please select a difficulty";

  if (!isValidSpanishWord) {
    return "Only letters from the Spanish alphabet without accents or spaces are allowed.";
  }

  if (word.length > wordLenght) {
    return "The word should be shorter";
  }
  if (word.length < wordLenght) {
    return "The word should be larger";
  }
  return null;
};
